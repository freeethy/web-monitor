import React from "react";

export default function addWaterMark(text, background, font, tablecroll) {
  if (typeof text === "undefined") {
    text = "中通天鸿";
  }

  if (typeof background === "undefined") {
    background = "#e2e2e2";
  }

  if (typeof font === "undefined") {
    font = "20px 黑体";
  }

  let cw = document.createElement("canvas");
  cw.id = "watermark";
  cw.width = 160;
  cw.height = 100;

  let ctx = cw.getContext("2d"); //返回一个用于在画布上绘图的环境
  ctx.clearRect(0, 0, 160, 100); //绘制之前画布清除
  ctx.font = font;
  ctx.rotate((-20 * Math.PI) / 180);
  ctx.fillStyle = "rgba(100,100,100,0.1)";
  ctx.fillText(text, -20, 80);
  ctx.rotate("20*Math.PI/180"); //坐标系还原

  //转换成base64
  let img_src = cw.toDataURL();

  //挂载到背景上
  if (tablecroll) {
    let table = document.getElementsByClassName("evaluaBg");
    for (let i = 0; i < table.length; i++) {
      let tableBody = document
        .getElementsByClassName("evaluaBg")
        [i].getElementsByClassName("ant-table-body");
      let tableFixed = document
        .getElementsByClassName("evaluaBg")
        [i].getElementsByClassName("ant-table-fixed");
      let tableFooter = document
        .getElementsByClassName("evaluaBg")
        [i].getElementsByClassName("ant-table-footer");
      for (let j = 0; j < tableBody.length; j++) {
        document
          .getElementsByClassName("evaluaBg")
          [i].getElementsByClassName("ant-table-body")[j].style.background =
          background + " url(" + img_src + ")";
      }
      for (let k = 0; k < tableFixed.length; k++) {
        document
          .getElementsByClassName("evaluaBg")
          [i].getElementsByClassName("ant-table-fixed")[k].style.background =
          background + " url(" + img_src + ")";
      }
      for (let k = 0; k < tableFooter.length; k++) {
        document
          .getElementsByClassName("evaluaBg")
          [i].getElementsByClassName("ant-table-footer")[k].style.background =
          background + " url(" + img_src + ")";
      }
    }
  }
  let antArr = document.getElementsByClassName("ant-card");
  // console.log("antArr",antArr)
  for (let i = 0; i < antArr.length; i++) {
    document.getElementsByClassName("ant-card")[i].style.background =
      background + " url(" + img_src + ")";
  }

  let watermaterArr = document.getElementsByClassName("watermater");
  for (let i = 0; i < watermaterArr.length; i++) {
    watermaterArr[i].style.background = background + " url(" + img_src + ")";
  }
  let watermaterFixedArr = document.getElementsByClassName("ant-table-fixed");
  for (let i = 0; i < watermaterFixedArr.length; i++) {
    watermaterFixedArr[i].style.background =
      background + " url(" + img_src + ")";
  }

  let watermaterFooterdArr = document.getElementsByClassName(
    "ant-table-footer"
  );
  for (let i = 0; i < watermaterFooterdArr.length; i++) {
    watermaterFooterdArr[i].style.background =
      background + " url(" + img_src + ")";
  }
}
