import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '2022-12-20',
    uv: 4000,
    users: 2400,
    amt: 2400,
  },
  {
    name: '2022-12-21',
    uv: 3000,
    users: 1398,
    amt: 2210,
  },
  {
    name: '2022-12-22',
    uv: 2000,
    users: 9800,
    amt: 2290,
  },
  {
    name: '2022-12-23',
    uv: 2780,
    users: 3908,
    amt: 2000,
  },
  {
    name: '2022-12-24',
    uv: 1890,
    users: 4800,
    amt: 2181,
  },
  {
    name: '2022-12-25',
    uv: 2390,
    users: 3800,
    amt: 2500,
  },
  {
    name: '2022-12-26',
    uv: 3490,
    users: 4300,
    amt: 2100,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8b0000" activeDot={{ r: 8 }}  strokeWidth={4} />

        </LineChart>
      </ResponsiveContainer>
    );
  }
}
