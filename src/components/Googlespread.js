import React, { useEffect, useState } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import "../style.css";
import creds from "../saconfig2.json";

const Googlespread = () => {
  // const arr = ["a", "b", "c"];
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const doc = new GoogleSpreadsheet(
      "1LKU8PEF3mJnq9FoUds6XYUwIrJbh-nj8pjfZaayKjtU"
    );
    (async function () {
      await doc.useServiceAccountAuth(creds);
      await doc.loadInfo();
      //   await doc.updateProperties({ title: "renamed doc" });

      const sheet = await doc.sheetsByIndex[0];
      const rows_ex = await sheet.getRows();
      console.log(rows_ex);
      setRows(rows_ex);
      //   const header = sheet.gridProperties;
      //   const header = sheet.loadHeaderRow();
      //   const header = sheet.headerValues;

      // rows를 통해 header를 접근할 필요없음. json 형태로 이미 받아들임(header 행(1행)도 안읽음)
      //   const header = await rows[0];
      //   console.log(doc.title);
      //   console.log(sheet.columnCount);
      //   console.log(rows[0]);

      //   for (let i = 0; i < 5; i++) {
      //     console.log("///////////");
      //     console.log(rows[i]);
      //   }

      //   console.log(header);
      //   const arr = rows;
    })();
  }, []);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th className="col1">상품명</th>
            <th className="col2">가격</th>
            <th className="col3">이미지</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.상품명}</td>
                <td>{item.가격}</td>
                <td>
                  <img src={item.이미지} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// 1LKU8PEF3mJnq9FoUds6XYUwIrJbh-nj8pjfZaayKjtU

export default Googlespread;
