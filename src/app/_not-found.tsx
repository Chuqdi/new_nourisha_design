import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("./NotFoundPage"), {
  ssr: false,
});

export default DynamicComponentWithNoSSR;
