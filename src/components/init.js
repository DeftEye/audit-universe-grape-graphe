import * as d3 from "d3";

export const getGraphParameters = (graphProps, container) => {
  const data = graphProps.data;

  const numberOfColumns = graphProps.numberOfColumns;

  const minRadius =
    !graphProps.minRadius || graphProps.minRadius === 0
      ? 5
      : graphProps.minRadius;

  const { width, height, maxRadius } = getSvgDimension(
    data,
    container.clientHeight,
    container.clientWidth,
    graphProps.useLogarithmicScale,
    graphProps.LogarithmicFactor,
    minRadius
  );

  const size = getSizeScale(
    graphProps.useLogarithmicScale,
    graphProps.LogarithmicFactor,
    data,
    maxRadius,
    minRadius
  );

  const newData = dataSorter(data, graphProps.isScoreGraph, size);

  return {
    data: newData,
    width,
    height,
    size,
    numberOfColumns,
  };
};
const getSizeScale = (
  useLogarithmicScale,
  LogarithmicFactor,
  data,
  maxRadius,
  minRadius
) => {
  const maxValue = Math.max(...data.map((x) => x.value));

  return useLogarithmicScale
    ? d3
        .scalePow()
        .exponent(LogarithmicFactor)
        .domain([0, maxValue])
        .range([minRadius, maxRadius])
    : d3.scaleLinear().domain([0, maxValue]).range([minRadius, maxRadius]);
};

const getSvgDimension = (
  data,
  containerHeight,
  containerWidth,
  useLogarithmicScale,
  LogarithmicFactor,
  minRadius
) => {
  const width = containerWidth;
  const height = containerHeight || containerWidth;
  let minDichotomyRadius = minRadius;
  let maxDichotomyRadius = Math.min(width, height) / 2;
  const rectangleArea = (width * height) / 2;
  let maxRadius = (minDichotomyRadius + maxDichotomyRadius) / 2;
  let circlesArea = getTotalCirclesArea(
    data,
    maxRadius,
    useLogarithmicScale,
    LogarithmicFactor,
    minRadius
  );
  let iterations = 0;
  while ((Math.abs(circlesArea - rectangleArea) > 0.1) & (iterations < 50)) {
    if (circlesArea - rectangleArea > 0) {
      maxDichotomyRadius = maxRadius;
      maxRadius = (minDichotomyRadius + maxDichotomyRadius) / 2;
    } else {
      minDichotomyRadius = maxRadius;
      maxRadius = (minDichotomyRadius + maxDichotomyRadius) / 2;
    }
    circlesArea = getTotalCirclesArea(
      data,
      maxRadius,
      useLogarithmicScale,
      LogarithmicFactor,
      minRadius
    );
    iterations = iterations + 1;
  }
  return { width, height, maxRadius };
};

const getTotalCirclesArea = (
  data,
  maxRadius,
  useLogarithmicScale,
  LogarithmicFactor,
  minRadius
) => {
  const sizeScale = getSizeScale(
    useLogarithmicScale,
    LogarithmicFactor,
    data,
    maxRadius,
    minRadius
  );
  return data.reduce(
    (acc, x) => acc + 3.14 * sizeScale(x.value) * sizeScale(x.value),
    0
  );
};

const dataSorter = (data, isScoreGraph, sizeScale) => {
  let acc = 0;
  if (isScoreGraph) {
    return data
      .sort((a, b) => scoreComparison(a, b))
      .map((d) => {
        acc += sizeScale(d.value) * 2;
        return { ...d, totalPreviousRadius: acc };
      });
  }
  return data
    .sort((a, b) => b.value - a.value)
    .map((d) => {
      acc += sizeScale(d.value) * 2;
      return { ...d, totalPreviousRadius: acc };
    });
};

const scoreComparison = (a, b) => {
  if (a === null) {
    return 1;
  }
  if (b === null) {
    return -1;
  }
  return b.score - a.score;
};
