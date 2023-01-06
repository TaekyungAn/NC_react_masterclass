import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";
import { ChartProps, IPriceData } from "../Interface";

const PriceCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 25px 0px;
  gap: 10px;

  div {
    width: 200px;
    height: 100px;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${(props) => props.theme.priceColor};
    &:first-child {
      grid-column: 1 / 3;
      grid-row: 1 / 2;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
      }
    }
  }
`;

function Price() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IPriceData>(["tickers", coinId], () =>
    fetchCoinTickers(`${coinId}`)
  );
  console.log(data);

  return (
    <PriceCards>
      <div>
        <span>최고가 달성</span>
        <span>{data?.quotes.USD.ath_date}</span>
        <span>{data?.quotes.USD.ath_price.toFixed(3)}</span>
      </div>
      <div>현재가 ${data?.quotes.USD.price.toFixed(3)}</div>
      <div>1시간 전보다 {data?.quotes.USD.percent_change_1h}%</div>
      <div>6시간 전보다 {data?.quotes.USD.percent_change_6h}%</div>
      <div>12시간 전보다 {data?.quotes.USD.percent_change_12h}%</div>
      <div>24시간 전보다 {data?.quotes.USD.percent_change_24h}%</div>
      <div>7일 전보다 {data?.quotes.USD.percent_change_7d}%</div>
      <div>30일 전보다 {data?.quotes.USD.percent_change_30d}%</div>
    </PriceCards>
  );
}
export default Price;
