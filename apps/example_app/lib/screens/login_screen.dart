import 'package:flutter/material.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';
import 'package:humax_design_system/humax_design_system.dart';

/// Screen 1: Login / Authentication flow.
///
/// Exercises:
/// - [HumaxAppBar]
/// - [HumaxTextField] (email + password, with validation)
/// - [HumaxButton] (filled, outlined, loading state)
/// - [HumaxDialog] (reset password confirmation)
/// - [HumaxSnackBar] (success feedback)
/// - [HumaxErrorState] inline variant (server error banner)
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  bool _loading = false;
  String? _serverError;

  // Simulates a network call that returns an auth error.
  Future<void> _handleLogin() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _loading = true;
      _serverError = null;
    });

    await Future.delayed(const Duration(seconds: 2));

    if (!mounted) return;
    setState(() {
      _loading = false;
      _serverError = 'Incorrect email or password. Please try again.';
    });
  }

  Future<void> _handleForgotPassword() async {
    final email = _emailController.text.trim();

    final confirmed = await HumaxDialog.show(
      context: context,
      title: 'Reset password',
      content: email.isEmpty
          ? "We'll send a password reset link to your registered email address."
          : "We'll send a reset link to $email.",
      confirmLabel: 'Send link',
      cancelLabel: 'Cancel',
    );

    if (confirmed == true && mounted) {
      HumaxSnackBar.show(
        context: context,
        message: 'Reset link sent — check your inbox.',
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: HumaxAppBar(
        title: 'Sign in',
        leading: const BackButton(),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(
            horizontal: HumaxSpace.lg,
            vertical: HumaxSpace.md,
          ),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: HumaxSpace.xl),

                // ── Headline ──────────────────────────────────────────────
                Text(
                  'Welcome back',
                  style: HumaxTextStyle.headingLg
                      .copyWith(color: HumaxColors.textPrimary),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: HumaxSpace.xs),
                Text(
                  'Sign in to your Humax account',
                  style: HumaxTextStyle.bodyMd
                      .copyWith(color: HumaxColors.textSecondary),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: HumaxSpace.threeXl),

                // ── Server error banner ───────────────────────────────────
                if (_serverError != null) ...[
                  HumaxErrorState(
                    variant: HumaxErrorVariant.inline,
                    title: 'Sign in failed',
                    message: _serverError!,
                  ),
                  const SizedBox(height: HumaxSpace.md),
                ],

                // ── Email field ───────────────────────────────────────────
                HumaxTextField(
                  controller: _emailController,
                  label: 'Email address',
                  hint: 'you@example.com',
                  keyboardType: TextInputType.emailAddress,
                  textInputAction: TextInputAction.next,
                  validator: (v) {
                    if (v == null || v.isEmpty) return 'Email is required';
                    if (!v.contains('@')) return 'Enter a valid email';
                    return null;
                  },
                ),
                const SizedBox(height: HumaxSpace.md),

                // ── Password field ────────────────────────────────────────
                HumaxTextField(
                  controller: _passwordController,
                  label: 'Password',
                  hint: '••••••••',
                  obscureText: true,
                  textInputAction: TextInputAction.done,
                  onSubmitted: (_) => _handleLogin(),
                  validator: (v) {
                    if (v == null || v.isEmpty) return 'Password is required';
                    if (v.length < 6) {
                      return 'Password must be at least 6 characters';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: HumaxSpace.xs),

                // ── Forgot password ───────────────────────────────────────
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: _handleForgotPassword,
                    style: TextButton.styleFrom(
                      foregroundColor: HumaxColors.actionPrimaryDefault,
                      padding: const EdgeInsets.symmetric(
                          horizontal: HumaxSpace.xs),
                    ),
                    child: Text(
                      'Forgot password?',
                      style: HumaxTextStyle.bodySm,
                    ),
                  ),
                ),
                const SizedBox(height: HumaxSpace.lg),

                // ── Primary CTA ───────────────────────────────────────────
                HumaxButton(
                  label: 'Sign in',
                  variant: HumaxButtonVariant.filled,
                  size: HumaxButtonSize.lg,
                  loading: _loading,
                  onPressed: _loading ? null : _handleLogin,
                ),
                const SizedBox(height: HumaxSpace.md),

                // ── Divider ───────────────────────────────────────────────
                Row(children: [
                  const Expanded(child: Divider()),
                  Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: HumaxSpace.sm),
                    child: Text(
                      'or',
                      style: HumaxTextStyle.bodySm
                          .copyWith(color: HumaxColors.textTertiary),
                    ),
                  ),
                  const Expanded(child: Divider()),
                ]),
                const SizedBox(height: HumaxSpace.md),

                // ── Secondary CTA ─────────────────────────────────────────
                HumaxButton(
                  label: 'Continue as guest',
                  variant: HumaxButtonVariant.outlined,
                  size: HumaxButtonSize.lg,
                  onPressed: () => Navigator.pop(context),
                ),

                const SizedBox(height: HumaxSpace.fourXl),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
}
