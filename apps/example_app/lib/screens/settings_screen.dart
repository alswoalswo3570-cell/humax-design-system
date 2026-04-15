import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import 'package:humax_design_system/humax_design_system.dart';

/// Screen 2: Settings / Profile.
///
/// Exercises:
/// - [HumaxAppBar]
/// - [HumaxSwitch] (notifications, analytics)
/// - [HumaxBottomSheet] (appearance picker)
/// - [HumaxDialog] destructive variant (remove device, sign out)
/// - [HumaxSnackBar] with undo action (device removed)
/// - [HumaxEmptyState] (when device list is empty)
class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _notifications = true;
  bool _analytics = false;
  String _appearance = 'Light';
  List<String> _devices = ['Living Room TV', 'Bedroom Set-top'];

  // ── Appearance sheet ──────────────────────────────────────────────────

  void _showAppearanceSheet() {
    HumaxBottomSheet.show(
      context: context,
      builder: (ctx) {
        final c = ctx.humaxColors;
        return Padding(
          padding: const EdgeInsets.fromLTRB(
            HumaxSpace.xl,
            HumaxSpace.xs,
            HumaxSpace.xl,
            HumaxSpace.xxl,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Appearance',
                style: HumaxTextStyle.titleLarge
                    .copyWith(color: c.textPrimary),
              ),
              const SizedBox(height: HumaxSpace.xs),
              ...['Light', 'Dark', 'System default'].map(
                (option) => ListTile(
                  contentPadding: EdgeInsets.zero,
                  title: Text(
                    option,
                    style: HumaxTextStyle.bodyCommon
                        .copyWith(color: c.textPrimary),
                  ),
                  trailing: _appearance == option
                      ? Icon(Icons.check,
                          color: c.actionPrimaryDefault)
                      : null,
                  onTap: () {
                    setState(() => _appearance = option);
                    Navigator.pop(ctx);
                    HumaxSnackBar.show(
                      context: context,
                      message: 'Appearance set to $option',
                    );
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  // ── Device removal ────────────────────────────────────────────────────

  Future<void> _removeDevice(String device) async {
    final confirmed = await HumaxDialog.show(
      context: context,
      variant: HumaxDialogVariant.destructive,
      title: 'Remove device?',
      content: '"$device" will be unlinked from your account.',
      confirmLabel: 'Remove',
      cancelLabel: 'Cancel',
    );

    if (confirmed == true && mounted) {
      setState(() => _devices.remove(device));
      HumaxSnackBar.show(
        context: context,
        message: '$device removed',
        actionLabel: 'Undo',
        onAction: () => setState(() {
          if (!_devices.contains(device)) _devices.add(device);
        }),
      );
    }
  }

  // ── Sign-out ─────────────────────────────────────────────────────────

  Future<void> _handleSignOut() async {
    final confirmed = await HumaxDialog.show(
      context: context,
      variant: HumaxDialogVariant.destructive,
      title: 'Sign out?',
      content:
          'You will need to sign in again to access your account and devices.',
      confirmLabel: 'Sign out',
      cancelLabel: 'Cancel',
    );

    if (confirmed == true && mounted) {
      Navigator.pop(context);
    }
  }

  // ── Build ─────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final c = context.humaxColors;
    return Scaffold(
      appBar: HumaxAppBar(title: 'Settings'),
      body: ListView(
        padding: const EdgeInsets.symmetric(vertical: HumaxSpace.xs),
        children: [
          // ── Preferences ────────────────────────────────────────────────
          _SectionHeader('Preferences'),

          HumaxSwitch(
            value: _notifications,
            onChanged: (v) => setState(() => _notifications = v),
            label: 'Push notifications',
            description: 'Receive alerts about your connected devices.',
          ),

          HumaxSwitch(
            value: _analytics,
            onChanged: (v) => setState(() => _analytics = v),
            label: 'Usage analytics',
            description:
                'Help improve Humax by sharing anonymous usage data.',
          ),

          _SettingsRow(
            label: 'Appearance',
            value: _appearance,
            onTap: _showAppearanceSheet,
          ),

          Divider(
            height: HumaxSpace.xl * 2,
            color: c.borderDefault,
          ),

          // ── Connected devices ──────────────────────────────────────────
          _SectionHeader('Connected devices'),

          if (_devices.isEmpty)
            Padding(
              padding: const EdgeInsets.all(HumaxSpace.xxl),
              child: HumaxEmptyState(
                icon: Icons.devices_outlined,
                headline: 'No devices linked',
                body:
                    'Add a Humax device to monitor and control it from the app.',
                primaryActionLabel: 'Add device',
                onPrimaryAction: () {
                  // In a real app: navigate to device pairing flow.
                  HumaxSnackBar.show(
                    context: context,
                    message: 'Device pairing — coming soon',
                  );
                },
              ),
            )
          else
            ..._devices.map(
              (device) => ListTile(
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: HumaxSpace.m,
                  vertical: HumaxSpace.xxs,
                ),
                leading: Icon(
                  Icons.tv_outlined,
                  color: c.textSecondary,
                ),
                title: Text(
                  device,
                  style: HumaxTextStyle.bodyCommon
                      .copyWith(color: c.textPrimary),
                ),
                trailing: IconButton(
                  icon: Icon(
                    Icons.delete_outline,
                    color: c.actionDestructiveDefault,
                  ),
                  tooltip: 'Remove device',
                  onPressed: () => _removeDevice(device),
                ),
              ),
            ),

          Divider(
            height: HumaxSpace.xl * 2,
            color: c.borderDefault,
          ),

          // ── Account ────────────────────────────────────────────────────
          _SectionHeader('Account'),

          _SettingsRow(
            label: 'Sign out',
            onTap: _handleSignOut,
            textColor: c.actionDestructiveDefault,
          ),

          const SizedBox(height: HumaxSpace.xxl),
        ],
      ),
    );
  }
}

// ── Shared sub-widgets ──────────────────────────────────────────────────────

class _SectionHeader extends StatelessWidget {
  const _SectionHeader(this.label);
  final String label;

  @override
  Widget build(BuildContext context) {
    final c = context.humaxColors;
    return Padding(
      padding: const EdgeInsets.fromLTRB(
        HumaxSpace.m,
        HumaxSpace.m,
        HumaxSpace.m,
        HumaxSpace.xxs,
      ),
      child: Text(
        label.toUpperCase(),
        style: HumaxTextStyle.captionPoint.copyWith(
          color: c.textTertiary,
          letterSpacing: 0.8,
        ),
      ),
    );
  }
}

class _SettingsRow extends StatelessWidget {
  const _SettingsRow({
    required this.label,
    required this.onTap,
    this.value,
    this.textColor,
  });

  final String label;
  final VoidCallback onTap;
  final String? value;
  final Color? textColor;

  @override
  Widget build(BuildContext context) {
    final c = context.humaxColors;
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: HumaxSpace.m),
      onTap: onTap,
      title: Text(
        label,
        style: HumaxTextStyle.bodyCommon.copyWith(
          color: textColor ?? c.textPrimary,
        ),
      ),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (value != null) ...[
            Text(
              value!,
              style: HumaxTextStyle.bodyCommon
                  .copyWith(color: c.textSecondary),
            ),
            const SizedBox(width: HumaxSpace.xxs),
          ],
          Icon(Icons.chevron_right, color: c.textTertiary, size: 20),
        ],
      ),
    );
  }
}
