import Symbol from "@/components/Symbols/Symbol";

export default function SymbolCompany({ data }) {
  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <Symbol props={data}>
      <h2 className="text-xl">
        This is the profile page for {data.symbol.toUpperCase()}
      </h2>
    </Symbol>
  );
}

import { getStockPaths, getStockProperties } from "@/Functions/fetchStockInfo";

export async function getStaticPaths() {
  const paths = getStockPaths();

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await getStockProperties({ params });

  return {
    props: {
      data,
    },
  };
}
