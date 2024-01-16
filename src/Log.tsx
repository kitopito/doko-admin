import { useEffect, useState } from 'react'
import { Text, Badge, BarList, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Title } from "@tremor/react";

const workerURL = "https://dokosen-worker.kitopitowada.workers.dev/";
//const workerURL = "http://127.0.0.1:8787/";
function Status() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    (async ()=>{
      /*
      const res = await fetch(workerURL, {
        body: JSON.stringify({teacherId: 1})
      });
      */
      const res = await fetch(workerURL + 'admin/status?teacherId=1');
      const fetchedData = await res.json() as {teacherInfo: TeacherInfo, sensors: SensorData[], logs: Log[]};
      console.log(fetchedData);
      setLogs(fetchedData.logs.reverse());
    })();
  }, []);

  return (
    <>
      <div></div>

      <h2>Log</h2>
      <Title>List of Swiss Federal Councillours</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>TimeStamp</TableHeaderCell>
            <TableHeaderCell>deviceAddress</TableHeaderCell>
            <TableHeaderCell>length</TableHeaderCell>
            <TableHeaderCell>Log</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((item, index) => {
            const dataString = item.log.slice(22, -2);
            const dataNum = dataString.length/4;
            const data = Array<number>();
            let dataArrayStr = '';
            for(let i=0; i<dataNum; i++) {
              const d = dataString.slice(4*i, 4*i + 4);
              const dInt = parseInt(d, 16);
              data.push(dInt);
              dataArrayStr += dInt.toString() + ',';
            }

            return (
            <TableRow key={item.timeStamp}>
              <TableCell>{(new Date(item.timeStamp * 1000)).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}</TableCell>
              <TableCell>
                <Text>{item.deviceAddress}</Text>
              </TableCell>
              <TableCell>
                <Text>{dataNum}</Text>
              </TableCell>
              <TableCell>
                <Text>{dataString}</Text>
              </TableCell>
              {data.map((v, i) => (
                <TableCell>
                  <Text>{v}</Text>
                </TableCell>
              ))}
            </TableRow>)
          })}
        </TableBody>
      </Table>
      {logs.map((log, i) => (
        <>
          <Card>
            <p>
              {log.timeStamp} {log.deviceAddress} {log.log}
            </p>
          </Card>
        </>
      ))}
      {/*
      {config.configs.map((item, i) => 
        <>
        <Card>
        <h2>状態: {config.statuses[i]}</h2>
        <BarList data={item.values.map((value, j) => {
          return {
          name: "センサ" + config.sensorIDs[j].toString(),
          value: value,
          }
        })} />
        </Card>
        </>
      )}
      */}
    </>
  );
}

export default Status
