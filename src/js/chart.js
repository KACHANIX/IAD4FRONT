// alert("HUTNA");
// var
//     canv = document.getElementById("canv"),
//     ctx = canv.getContext('2d');
// var x1,y1;
// document.getElementById("canv").on('mousedown', function (e) {
//     if (parseFloat(R)  == 0.0) {
//         viewR();
//         return;
//     }
//     var pos = getMousePos(canv, e);
//     x1 = pos.x;
//     y1 = pos.y;
//     ctx.fillStyle = "red";
//     ctx.beginPath();
//     ctx.arc(x1, y1, 1.5, 0, Math.PI * 2);
//     ctx.fill();
//     document.getElementById("form:YT").value = Math.round((150 - y1) / 20 * 100) / 100;
//     document.getElementById("form:hiddenX").value = Math.round((x1 - 150) / 20 * 100) / 100;
//     updateChart();
//     document.getElementById("form:checkBtn").click();
// });
//
//
// function getMousePos(canv, e) {
//     var rect = canv.getBoundingClientRect();
//     return {
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top
//     };
// }
//
// function updateChart() {
//     var
//         canv = document.getElementById("canv"),
//         ctx = canv.getContext('2d');
//
//
//     var xValues = [],
//         yValues = [],
//         isInArea = [];
//
//     var i = 0;
//
//     //
//     // $('.hitsTableXColumn').each(function () {
//     //     xValues[i++] = parseFloat($(this).html());
//     // });
//     //
//     // i = 0;
//     //
//     // $('.hitsTableYColumn').each(function () {
//     //     yValues[i++] = parseFloat($(this).html());
//     // });
//     //
//     // i = 0;
//     //
//     // $('.hitsTableCheckColumn').each(function () {
//     //     isInArea[i++] = $(this).html();
//     // });
//
//     drawArea(document.getElementById("form:hiddenR").value, ctx, canv);
//     drawAxis(ctx);
//     drawArrows(ctx);
//     drawTips(ctx);
//     drawXValues(ctx);
//     drawYValues(ctx);
//     drawPreviousHits(xValues, yValues, isInArea, ctx);
// }
//
// function drawArea(R, ctx, canv) {
//     ctx.clearRect(0, 0, canv.width, canv.height);
//     ctx.fillStyle = "#3399FF";
//     ctx.save();
//     ctx.beginPath()
//     ctx.moveTo(canv.width / 2 , canv.height / 2 );                                 ////////////// -1
//     ctx.arc(canv.width / 2, canv.height / 2 - 1, R * 20, Math.PI, Math.PI * 3 / 2, false);
//     ctx.closePath();
//     ctx.fill();
//     ctx.fillStyle = "#3399FF";
//     ctx.fillStyle = "#000";
//     ctx.strokeRect(0, 0, 300, 300);
//     ctx.fillStyle = "#3399FF";
//     ctx.fillRect(150 + 1, 150 - (R / 2) * 20 - 1, R * 20, (R / 2) * 20); ///////// +1
//     ctx.beginPath();
//     ctx.moveTo(150, 150);
//     ctx.lineTo(150, 150 + 2.5 + R * 20);
//     ctx.lineTo(151 + (R / 2) * 20, 150);
//     ctx.closePath();
//     ctx.fill();
//     ctx.fillStyle = "#000";
// }
//
// function drawPreviousHits(xValues, yValues, isInArea, ctx) {
//     for (var i = 0; i < xValues.length; ++i) {
//         var str = isInArea[i];
//         str = str.trim(" ");
//         if (str.localeCompare("false") != 0) {
//             ctx.fillStyle = "#11FF00";
//         } else {
//             ctx.fillStyle = "red";
//         }
//         ctx.beginPath();
//         ctx.arc(xValues[i] * 20 + 150 + 0.5, 150 - yValues[i] * 20 - 0.5, 2, 0, Math.PI * 2);
//         ctx.fill();
//     }
//     ctx.fillStyle = "#000";
// }
//
// function drawAxis(ctx) {
//     ctx.beginPath();
//     ctx.moveTo(150 + 0.5, 0);
//     ctx.lineTo(150 + 0.5, 300);
//     ctx.stroke();
//
//     ctx.beginPath();
//     ctx.moveTo(0, 150 - 0.5);
//     ctx.lineTo(300, 150 - 0.5);
//     ctx.stroke();
// }
//
// function drawArrows(ctx) {
//     ctx.beginPath();
//     ctx.moveTo(150 + 0.5, 0);
//     ctx.lineTo(147 + 0.5, 7);
//     ctx.stroke();
//
//     ctx.beginPath();
//     ctx.moveTo(150 + 0.5, 0);
//     ctx.lineTo(153 + 0.5, 7);
//     ctx.stroke();
//
//     ctx.beginPath();
//     ctx.moveTo(300, 150 - 0.5);
//     ctx.lineTo(293, 150 - 3.5);
//     ctx.stroke();
//
//     ctx.beginPath();
//     ctx.moveTo(300, 150 - 0.5);
//     ctx.lineTo(293, 150 + 2.5);
//     ctx.stroke();
// }
//
// function drawTips(ctx) {
//     for (var i = 10; i <= 290; i += 20) {
//         ctx.beginPath();
//         ctx.moveTo(i + 0.5, 150 - 3);
//         ctx.lineTo(i + 0.5, 150 + 2);
//         ctx.stroke();
//     }
//     for (var i = 10; i <= 290; i += 20) {
//         ctx.beginPath();
//         ctx.moveTo(148, i - 0.5);
//         ctx.lineTo(153, i - 0.5);
//         ctx.stroke();
//     }
// }
//
// function drawXValues(ctx) {
//     ctx.font = "9px Arial";
//     var x = -14;
//     for (var i = -7; i < 0; ++i) {
//         ctx.fillText(i, x += 20, 150 - 3);
//     }
//     x += 22;
//     for (var i = 1; i <= 7; ++i) {
//         ctx.fillText(i, x += 20, 150 - 3);
//     }
// }
//
// function drawYValues(ctx) {
//     ctx.font = "9px Arial";
//     var y = -8;
//     for (var i = 7; i >= -7; --i) {
//         if (i != 0) {
//             ctx.fillText(i, 154, y += 20);
//         } else y += 20;
//     }
// }
//
// function clearChart(ctx, canv) {
//     ctx.clearRect(0, 0, canv.width, canv.height);
//     ctx.fillStyle = "#000";
//     ctx.strokeRect(0, 0, 300, 300);
//     drawAxis(ctx);
//     drawArrows(ctx);
//     drawTips(ctx);
//     drawXValues(ctx);
//     drawYValues(ctx);
// }