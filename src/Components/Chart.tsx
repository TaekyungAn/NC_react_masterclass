import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetcherCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { ChartProps, IHistorical } from "../Interface";
import { ICoinsProps } from "./Coins";
import styled from "styled-components";

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isDark } = useOutletContext<ICoinsProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetcherCoinHistory(coinId)
    // { refetchInterval: 1000 }
  );
  const ChartRoom = styled.div``;

  console.log(coinId);
  console.log("Chart:", isDark);
  const expectData = data ?? [];
  const candelChartData = expectData?.map((price) => {
    return {
      x: price.time_close,
      y: [price.open, price.high, price.low, price.close],
    };
  });

  return (
    <ChartRoom>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <div>
          {/* <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                // series data [] 가 받아야 하는 건 number
                // data?.map() 읽어오면 number 이지만 못읽어오면 undefind 가 돼서 문제 발생
                // 그래서 저 형식이 number 로 강제해주면 해결되는 문제입니다.
                // parseFloat를 통해 형 변환 : data: data?.map((price) => parseFloat(price.close)) ?? []
                data: data?.map((price) => price.close) as number[],
              },
            ]}
            options={{
              theme: { mode: isDark ? "dark" : "light" },
              chart: {
                height: 300,
                width: 500,
                toolbar: { show: false },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              yaxis: { show: false },
              xaxis: {
                labels: { show: false },
                axisTicks: { show: false },
                axisBorder: { show: false },
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toISOString()
                ),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: { formatter: (value) => `$ ${value.toFixed(2)}` },
              },
            }}
          /> */}
          <ApexChart
            type="candlestick"
            options={{
              theme: { mode: isDark ? "dark" : "light" },
              xaxis: {
                type: "datetime",
              },
              yaxis: {
                tooltip: {
                  enabled: true,
                },
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: { show: false },
                background: "transparent",
              },
            }}
            series={[
              {
                name: "Price",
                data: candelChartData,
              },
            ]}
          />
          <div></div>
        </div>
      )}
    </ChartRoom>
  );
}
export default Chart;
