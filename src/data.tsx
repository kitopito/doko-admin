interface  TeacherInfo {
    id: number,
    name: string,
    status: string,
    updatedAt: number,
}
interface SensorData {
    id: number,
    value: number,
}
interface Log {
    id: number,
    log: string,
    deviceAddress: number | null,
    timeStamp: number,
}