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

      // await 는 필요없음
      // const sheet = await doc.sheetsByIndex[0];
      const sheet = doc.sheetsByIndex[0];
      const rows_ex = await sheet.getRows();
      console.log(rows_ex);
      setRows(rows_ex);
      await doc.updateProperties({ title: "renamed doc" });

      // rows를 통해 header를 접근할 필요없음. json 형태로 이미 받아들임(header 행(1행)도 안읽음)
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
                  <img src={item.비고} />
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
