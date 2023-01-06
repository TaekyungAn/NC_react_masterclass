import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link, useMatch } from "react-router-dom";
import {
  Outlet,
  useLocation,
  useParams,
  useOutletContext,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { IInfoData, IPriceData, RouteState } from "../Interface";
import { ICoinsProps } from "./Coins";

const Container = styled.div`
  padding: 0px 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};

  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 40px;
    height: 40px;

    margin-right: 10px;
  }
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 70px 0;
  a {
    width: 100px;
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: white;

    border-radius: 10px;
    box-shadow: ${(props) => props.theme.boxshadowColor};
  }
  button {
    border: none;
    background-color: transparent;
    box-shadow: ${(props) => props.theme.boxshadowColor};
    border-radius: 10px;
    width: 100px;
    height: 40px;

    color: white;

    cursor: pointer;
  }
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.cardColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

function Coin() {
  const { coinId } = useParams();
  // useLocation은 Link의 state보내는거 받아올 때 사용
  const { state } = useLocation() as RouteState;
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<IInfoData>();
  // const [priceInfo, setPriceInfo] = useState<IPriceData>();

  const { toggleDark, isDark } = useOutletContext<ICoinsProps>();
  console.log("Coin:", isDark);

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(`${coinId}`),
    { refetchInterval: 5000 }
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(`${coinId}`)
  );

  console.log("name:", state);

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Link to={`/`}>&lt; Home</Link>
        <Title>
          <img
            alt={infoData?.symbol}
            src={`https://coinicons-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`}
          />
          {state?.name ? state.name : loading ? "loading..." : infoData?.name}
        </Title>
        <button onClick={toggleDark}>Toggle Mode</button>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
            {/* <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem> */}
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
          </Tabs>

          <Outlet context={{ coinId, isDark }} />
        </>
      )}
    </Container>
  );
}
export default Coin;
