import {React,useEffect} from 'react'
import routes from './routes';
import axios from 'axios';
import store from'./pages/redux/store';
import { useRoutes } from 'react-router-dom'

export default function App() {
    useEffect(()=>{
        let overallData=[];
        function findPropertyValue(a, b) {
            return a.slice(a.indexOf(b) + b.length + 1, a.indexOf(',', a.indexOf(b) + b.length + 1));
        }
        // 返回处理后一周的排次表
        function dataProcess(data,shop){
            // 生成随机地址
            function generateAddress(){
                // 街道列表
                const streets = ["新都大街", "新都中街", "新都小街", "新都南街", "新都北街", "新都东街", "新都西街"];

                // 小区列表
                const communities = ["翠华城", "置信城市广场", "晋阳小区", "蓝润锦江华府", "华侨城", "德阳花园"];

                // 随机生成街道和小区
                const street = streets[Math.floor(Math.random() * streets.length)];
                const community = communities[Math.floor(Math.random() * communities.length)];

                // 生成完整的地址
                return `四川省成都市新都区${street}${Math.floor(Math.random() * 1000)}号${community}`;
            }
            let data1=data.data.map(item=>{
                // a为每天排次表。 
                let a=[];
                for(let i in item){
                    // b为单个员工的信息
                    let b={};
                    b.key=findPropertyValue(i,'id');
                    b.employeeName=findPropertyValue(i,'employeeName');
                    b.telephone=function generateRandomPhoneNumber() {
  const secondDigit = [3, 4, 5, 7, 8][Math.floor(Math.random() * 5)];
  const restDigits = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `1${secondDigit}${restDigits}`;
}();
                    b.shop=shop;
                    b.job=findPropertyValue(i,'job');
                    b.time=item[i][0];
                    b.position=generateAddress();
                    b.preference=findPropertyValue(i,'prefer');
                    if(b.time!==''){
                        a.push(b);
                    }
                }
                a=a.sort(function (o1, o2) {
                    return Number(o1.time.slice(0,2)) - Number(o2.time.slice(0,2));
                })
                return a;
            })
            return data1;
        }
        let url=['http://127.0.0.1:4523/m1/2409767-0-default/schedule/cache?shopname=%E5%A4%A7%E6%A6%95%E5%8D%8E&weekid=1','http://127.0.0.1:4523/m1/2409767-0-default/schedule/cache?shopname=%E5%A4%A7%E6%A6%95%E5%8D%8E&weekid=2','http://127.0.0.1:4523/m1/2409767-0-default/schedule/cache?shopname=%E5%A4%A7%E6%A6%95%E5%8D%8E&weekid=3','http://127.0.0.1:4523/m1/2409767-0-default/schedule/cache?shopname=%E5%A4%A7%E6%A6%95%E5%8D%8E&weekid=4','http://127.0.0.1:4523/m1/2409767-0-default/schedule/cache?shopname=%E8%88%9E%E4%B8%9C%E9%A3%8E&weekid=1','http://127.0.0.1:4523/m1/2409767-0-default/schedule/cache?shopname=%E8%88%9E%E4%B8%9C%E9%A3%8E&weekid=2','http://127.0.0.1:4523/m1/2409767-0-default/schedule/cache?shopname=%E8%88%9E%E4%B8%9C%E9%A3%8E&weekid=3','http://127.0.0.1:4523/m1/2409767-0-default/schedule/cache?shopname=%E8%88%9E%E4%B8%9C%E9%A3%8E&weekid=4','http://127.0.0.1:4523/m1/2409767-0-default/schedule/cache?shopname=%E7%BA%A2%E6%97%97%E8%BF%9E%E9%94%81&weekid=1','http://127.0.0.1:4523/m1/2409767-0-default/schedule/cache?shopname=%E7%BA%A2%E6%97%97%E8%BF%9E%E9%94%81&weekid=2','http://127.0.0.1:4523/m1/2409767-0-default/schedule/cache?shopname=%E7%BA%A2%E6%97%97%E8%BF%9E%E9%94%81&weekid=3','http://127.0.0.1:4523/m1/2409767-0-default/schedule/cache?shopname=%E7%BA%A2%E6%97%97%E8%BF%9E%E9%94%81&weekid=4'];
    async function fetchData() {
    for (let i = 0; i < 12; i++) {
        let config = {
        method: 'post',
        url: url[i],
        headers: { 
        'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
        }
        };
        await axios(config)
        .then(function (response) {
            let shop;
            if(i<4){
                shop="中国石油西南石油大学科技园加油站";
            }
            else if(i>=4&&i<8){
                shop="中国石油新都天府加油站";
            }
            else{
                shop="红旗连锁";
            }
            // console.log(dataProcess(response,shop));
            overallData.push(dataProcess(response,shop));
            overallData.i=0;
            overallData.j=0;
            store.dispatch({type:'',data:overallData});
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    }
    fetchData();
    },[])

    const element = useRoutes(routes);
    return (
        <span>{element}</span>
    )
}
