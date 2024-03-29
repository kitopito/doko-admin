import { useEffect, useState } from 'react'
import { BarList, Card } from "@tremor/react";
import { Button, Center, Spinner } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const workerURL = "https://dokosen-worker.kitopitowada.workers.dev/";
//const workerURL = "http://127.0.0.1:8787/";
function Config() {
  const location = useLocation();
    
  const [teacher, setTeacher] = useState<TeacherInfo>();
  const [sensor, setSensor] = useState<SensorData[]>([]);
  const [config, setConfig] = useState({
    sensorIDs: [0],
    configs: [
      {statusId: 0, values: [0]}
    ],
    statuses: Array<string>(),
  });
  
  const [cursor, setCursor] = useState(0);
  const [isSetting, setSetting] = useState(false);
  const [isWaiting, setWaiting] = useState(false);

  useEffect(() => {
    (async ()=>{
      const id = location.state;
      /*
      const res = await fetch(workerURL, {
        body: JSON.stringify({teacherId: 1})
      });
      */
      const c = await fetch(workerURL + 'config?teacherId=' + id.toString());
      const fetchedConfig = await c.json();
      console.log(fetchedConfig);
      setConfig(fetchedConfig);

      const fetchedData = await fetchStatus(id);
      console.log(fetchedData);
      setTeacher(fetchedData.teacherInfo);
      setSensor(fetchedData.sensors);
    })();
  }, []);

  return (
    <>
    <div>
      {isWaiting
        ? <Center><Spinner margin={5} /></Center>
        : <>
          <Center paddingTop={5}><p>{config.statuses[cursor]}に状態を変更してください</p></Center>
          <Center><Button marginBottom={5} marginTop={2} onClick={()=>{
            const ButtonClickTime = getNowScond();
            console.log("Button is  Clicked at " + ButtonClickTime.toString());

            const timer = setInterval(async ()=>{
              const fetchedData = await fetchStatus(teacher!.id);
              const fetchedTeacher = fetchedData.teacherInfo;
              const sensor = fetchedData.sensors;
              console.log("updated at " + fetchedTeacher.updatedAt.toString());
              if(fetchedTeacher.updatedAt > ButtonClickTime) {
                const newConfig = {...config}
                newConfig.configs[cursor].values = sensor.map((item)=>{
                  return item.value;
                });
                setConfig(newConfig);

                setWaiting(false);
                clearInterval(timer);
                setSetting(false);

                if(cursor + 1 < config.statuses.length) {
                  setCursor(cursor + 1);
                } else {
                  await fetch(workerURL + 'config', {
                    method: "POST",
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                      "Content-Type": "application/json",
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    redirect: "follow", // manual, *follow, error
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({teacherId: fetchedTeacher.id, config: config}), // 本体のデータ型は "Content-Type"
                  });
                  setCursor(0);
                }
              }
              setTeacher(fetchedData.teacherInfo);
              setSensor(fetchedData.sensors);
            }, 1000);

            setWaiting(true);
          }}>変更した！</Button></Center>
          </>
      }
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
    </div>
    </>
  )
}

export default Config

async function fetchStatus(teacherId: number) {
    const res = await fetch(workerURL + 'admin/config?teacherId=' + teacherId.toString());
    const fetchedData = await res.json() as {teacherInfo: TeacherInfo, sensors: SensorData[]};
    console.log(fetchedData);
    return fetchedData;
}

function getNowScond() {
  const timeStampNow: number = Math.floor(Date.now() / 1000); // set Unix Time (second)
  return timeStampNow;
}