////////////////////////////////////////////////////////////////////////////////
// OpenSCAD Export for Untitled-1                                             //
////////////////////////////////////////////////////////////////////////////////
// Available Shapes modules and variables                                     //
//   - Untitled_1                                                             //
//   - Untitled_1_Layer1                                                      //
// All Groups: Untitled_1_Groups                                              //
////////////////////////////////////////////////////////////////////////////////
// Top Level Module Invocation                                                //
// Untitled_1();
////////////////////////////////////////////////////////////////////////////////
// Data Indexes                                                               //
iAiShapeCenters = 0;
iAiShapeBounds = 1;
iAiShapePoints = 2;
iAiShapePaths = 3;
iAiOverallBounds = 4;
iAiOverallCenter = 5;
iAiOverallBoundsCenter = 6;
iAiOverallSize = 7;
////////////////////////////////////////////////////////////////////////////////

Untitled_1_shapeCount = 3;
Untitled_1_shapeBounds = [ [ [-40.73, -7.3], [29.94, 17.73] ], [ [-40.67, -7.13], [29.88, 17.57] ], [ [-43.64, -52.02], [49.8, 52.31] ] ];
Untitled_1_overallBounds = [ [-43.64, -52.02], [49.8, 52.31] ];
Untitled_1_overallBoundsCenter = [3.08, 0.15];
Untitled_1_overallSize = [93.44, 104.33];
Untitled_1_Layer1_shapeBounds = [ [ [-40.73, -7.3], [29.94, 17.73] ], [ [-40.67, -7.13], [29.88, 17.57] ], [ [-43.64, -52.02], [49.8, 52.31] ] ];
Untitled_1_Layer1_overallBounds = [ [-43.64, -52.02], [49.8, 52.31] ];
Untitled_1_Layer1_overallBoundsCenter = [3.08, 0.15];
Untitled_1_Layer1_overallSize = [93.44, 104.33];
Untitled_1_overallCenter = [45.08, -87.24];
Untitled_1_shapeCenters = [[-9.31, 3.83], [-5.4, 5.22], [2.44, -1.22]];
Untitled_1_Layer1_shapeCenters = [ Untitled_1_shapeCenters[0], Untitled_1_shapeCenters[1], Untitled_1_shapeCenters[2] ];
Untitled_1_Layer1_overallCenter = [0, 0];
Untitled_1_shapePoints = [ [[-40.62, -7.3], [-40.67, -7.13], [-40.73, -6.96], [-5.46, 5.38], [29.82, 17.73], [29.88, 17.57], [29.94, 17.4], [-5.34, 5.05], [-40.62, -7.3]], [[-40.67, -7.13], [-5.4, 5.22], [29.88, 17.57]], [[19.96, -52.02], [13.28, -50.71], [6.49, -46.78], [-2.64, -19.1], [3.94, 17.3], [8.24, 37.33], [7.3, 49.9], [5.8, 51.3], [3.75, 51.96], [-6.27, 51.58], [-13.09, 47.51], [-16.85, 37.45], [-15.1, 22.55], [-16.64, 7.24], [-27.38, -15.11], [-38.19, -31.63], [-43.36, -38.63], [-43.5, -38.53], [-43.64, -38.42], [-27.59, -14.72], [-15.45, 22.46], [-17.19, 37.53], [-13.36, 47.75], [-6.4, 51.92], [3.8, 52.31], [5.98, 51.6], [7.59, 50.1], [8.6, 37.37], [4.28, 17.22], [-2.29, -19.01], [6.7, -46.5], [15.9, -51.16], [24.84, -50.92], [42.97, -33.29], [49.47, -19.07], [49.64, -19.12], [49.8, -19.18], [43.25, -33.49], [24.94, -51.26], [22.46, -51.83], [19.96, -52.02]] ];
Untitled_1_shapePaths = [
	[
		[ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
	],
	[
		[ 0, 1, 2 ]
	],
	[
		[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40 ]
	]
];
Untitled_1_Layer1_shapePoints = [ Untitled_1_shapePoints[0], Untitled_1_shapePoints[1], Untitled_1_shapePoints[2] ];
Untitled_1_Layer1_shapePaths = [ Untitled_1_shapePaths[0], Untitled_1_shapePaths[1], Untitled_1_shapePaths[2] ];
module Untitled_1_shape0() {
	polygon(points=Untitled_1_shapePoints[0], paths=Untitled_1_shapePaths[0]);
}
module Untitled_1_shape1() {
	polygon(points=Untitled_1_shapePoints[1], paths=Untitled_1_shapePaths[1]);
}
module Untitled_1_shape2() {
	polygon(points=Untitled_1_shapePoints[2], paths=Untitled_1_shapePaths[2]);
}
module Untitled_1() {
	Untitled_1_shape0();
	Untitled_1_shape1();
	Untitled_1_shape2();
}
module Untitled_1_Layer1() {
	Untitled_1_shape0();
	Untitled_1_shape1();
	Untitled_1_shape2();
}
////////////////////////////////////////////////////////////////////////////////
// Array Assignments
Untitled_1 = [Untitled_1_shapeCenters,Untitled_1_shapeBounds,Untitled_1_shapePoints,Untitled_1_shapePaths,Untitled_1_overallBounds,Untitled_1_overallCenter,Untitled_1_overallBoundsCenter,Untitled_1_overallSize];
Untitled_1_Layer1 = [Untitled_1_Layer1_shapeCenters,Untitled_1_Layer1_shapeBounds,Untitled_1_Layer1_shapePoints,Untitled_1_Layer1_shapePaths,Untitled_1_Layer1_overallBounds,Untitled_1_Layer1_overallCenter,Untitled_1_Layer1_overallBoundsCenter,Untitled_1_Layer1_overallSize];

// Overall Group Array                                                        //
Untitled_1_Groups = [
	Untitled_1,
	Untitled_1_Layer1
];
