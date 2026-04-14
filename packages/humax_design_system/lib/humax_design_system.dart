/// Humax Design System — Flutter widget package.
///
/// Import this single file to access all Humax components and patterns:
/// ```dart
/// import 'package:humax_design_system/humax_design_system.dart';
/// ```
library humax_design_system;

// Components — Tier 1
export 'src/components/button/button.dart';
export 'src/components/text_field/text_field.dart';
export 'src/components/app_bar/app_bar.dart';

// Components — Tier 2 (navigation + form selection)
export 'src/components/navigation_bar/navigation_bar.dart';
export 'src/components/tab_bar/tab_bar.dart';
export 'src/components/checkbox/checkbox.dart';
export 'src/components/radio/radio.dart';
export 'src/components/switch/humax_switch.dart';

// Components — Tier 3 (overlays + feedback)
export 'src/components/bottom_sheet/bottom_sheet.dart';
export 'src/components/dialog/dialog.dart';
export 'src/components/snack_bar/snack_bar.dart';

// Patterns
export 'src/patterns/empty_state.dart';
export 'src/patterns/skeleton.dart';
export 'src/patterns/error_state.dart';
