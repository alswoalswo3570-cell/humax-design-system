import 'package:flutter/widgets.dart';
import 'package:humax_design_tokens/humax_design_tokens.dart';

/// Resolves the current [HumaxBreakpoint] tier from the ambient
/// [MediaQuery] width.
///
/// Width thresholds are defined in [HumaxBreakpoints]:
/// - `compact`  : `width < 600dp`
/// - `medium`   : `600dp ≤ width < 840dp`
/// - `expanded` : `width ≥ 840dp`
///
/// ```dart
/// final bp = humaxBreakpointOf(context);
/// // or, via the extension below:
/// final tier = HumaxGrid.forBreakpoint(context.humaxBreakpoint);
/// padding: EdgeInsets.symmetric(horizontal: tier.margin)
/// ```
HumaxBreakpoint humaxBreakpointOf(BuildContext context) {
  final width = MediaQuery.sizeOf(context).width;
  if (width >= HumaxBreakpoints.expanded) return HumaxBreakpoint.expanded;
  if (width >= HumaxBreakpoints.medium)   return HumaxBreakpoint.medium;
  return HumaxBreakpoint.compact;
}

/// Fluent access: `context.humaxBreakpoint` → current viewport tier.
extension HumaxBreakpointContext on BuildContext {
  HumaxBreakpoint get humaxBreakpoint => humaxBreakpointOf(this);
}
