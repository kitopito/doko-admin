import { useEffect, useState } from 'react'
import { BarList, Card } from "@tremor/react";

const workerURL = "https://dokosen-worker.kitopitowada.workers.dev/";
//const workerURL = "http://127.0.0.1:8787/";
function Status() {
  const [teacher, setTeacher] = useState<TeacherInfo>();
  const [sensor, setSensor] = useState<SensorData[]>([]);
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
      setTeacher(fetchedData.teacherInfo);
      setSensor(fetchedData.sensors);
      setLogs(fetchedData.logs);
    })();
  }, []);

  return (
    <>
      <div>
      </div>
        <h1>{teacher?.name}先生</h1>
        <BarList data={sensor?.map((data, i) => {
          return {
          name: "センサ" + data.id.toString(),
          value: data.value,
          }
        })} />

        <h2>Log</h2>
      {logs.map((log, i) => 
        <>
        <Card>
          <p>{log.timeStamp}  {log.deviceAddress}  {log.log}</p>
        </Card>
        </>
      )}
      {
      /*
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
      */
      }
    </>
  )
}

export default Status
