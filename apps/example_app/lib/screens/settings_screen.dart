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
      builder: (ctx) => Padding(
        padding: const EdgeInsets.fromLTRB(
          HumaxSpace.lg,
          HumaxSpace.sm,
          HumaxSpace.lg,
          HumaxSpace.xl,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Appearance',
              style: HumaxTextStyle.titleLarge
                  .copyWith(color: HumaxColors.textPrimary),
            ),
            const SizedBox(height: HumaxSpace.sm),
            ...['Light', 'Dark', 'System default'].map(
              (option) => ListTile(
                contentPadding: EdgeInsets.zero,
                title: Text(
                  option,
                  style: HumaxTextStyle.bodyCommon
                      .copyWith(color: HumaxColors.textPrimary),
                ),
                trailing: _appearance == option
                    ? Icon(Icons.check,
                        color: HumaxColors.actionPrimaryDefault)
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
      ),
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
    return Scaffold(
      appBar: HumaxAppBar(title: 'Settings'),
      body: ListView(
        padding: const EdgeInsets.symmetric(vertical: HumaxSpace.sm),
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
            height: HumaxSpace.lg * 2,
            color: HumaxColors.borderDefault,
          ),

          // ── Connected devices ──────────────────────────────────────────
          _SectionHeader('Connected devices'),

          if (_devices.isEmpty)
            Padding(
              padding: const EdgeInsets.all(HumaxSpace.xl),
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
                  horizontal: HumaxSpace.md,
                  vertical: HumaxSpace.xs,
                ),
                leading: Icon(
                  Icons.tv_outlined,
                  color: HumaxColors.textSecondary,
                ),
                title: Text(
                  device,
                  style: HumaxTextStyle.bodyCommon
                      .copyWith(color: HumaxColors.textPrimary),
                ),
                trailing: IconButton(
                  icon: Icon(
                    Icons.delete_outline,
                    color: HumaxColors.feedbackErrorDefault,
                  ),
                  tooltip: 'Remove device',
                  onPressed: () => _removeDevice(device),
                ),
              ),
            ),

          Divider(
            height: HumaxSpace.lg * 2,
            color: HumaxColors.borderDefault,
          ),

          // ── Account ────────────────────────────────────────────────────
          _SectionHeader('Account'),

          _SettingsRow(
            label: 'Sign out',
            onTap: _handleSignOut,
            textColor: HumaxColors.feedbackErrorDefault,
          ),

          const SizedBox(height: HumaxSpace.xl),
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
    return Padding(
      padding: const EdgeInsets.fromLTRB(
        HumaxSpace.md,
        HumaxSpace.md,
        HumaxSpace.md,
        HumaxSpace.xs,
      ),
      child: Text(
        label.toUpperCase(),
        style: HumaxTextStyle.captionPoint.copyWith(
          color: HumaxColors.textTertiary,
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
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: HumaxSpace.md),
      onTap: onTap,
      title: Text(
        label,
        style: HumaxTextStyle.bodyCommon.copyWith(
          color: textColor ?? HumaxColors.textPrimary,
        ),
      ),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (value != null) ...[
            Text(
              value!,
              style: HumaxTextStyle.bodyCommon
                  .copyWith(color: HumaxColors.textSecondary),
            ),
            const SizedBox(width: HumaxSpace.xs),
          ],
          Icon(Icons.chevron_right, color: HumaxColors.textTertiary, size: 20),
        ],
      ),
    );
  }
}
