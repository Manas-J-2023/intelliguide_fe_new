"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function Pie_Chart({
  data,
  guidance,
}: {
  data: { name: string; solved: number }[] | undefined;
  guidance: string | null;
}) {
  const languageData = {
    data: data,
    guidance: guidance,
  };

  // const colors = [
  // "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC300",
  // "#DAF7A6", "#581845", "#C70039", "#900C3F", "#1ABC9C",
  // "#2ECC71", "#3498DB", "#9B59B6", "#34495E", "#16A085",
  // "#27AE60", "#2980B9", "#8E44AD", "#2C3E50", "#F39C12",
  // "#E74C3C", "#D35400", "#7D3C98", "#BDC3C7", "#273746"
  // ];
  // const colors = [
  // "#A4C3B2", "#D4A5A5", "#E5C3C6", "#9EB3C2", "#C5CBE3",
  // "#B5EAD7", "#C7DAD8", "#D8E2DC", "#ECE4DB", "#FFE5D9",
  // "#B3C6C7", "#BAC7A7", "#E9D8A6", "#F4A261", "#9D8189",
  // "#A7BED3", "#B8E1DD", "#DAE8F5", "#EDE4E4", "#C9CCD5",
  // "#A2D2FF", "#BDE0FE", "#FFC8DD", "#FFAFCC", "#D8BFD8"
  // ];
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#FFC300",
    "#DAF7A6",
    "#581845",
    "#C70039",
    "#900C3F",
    "#1ABC9C",
    "#2ECC71",
    "#3498DB",
    "#9B59B6",
    "#34495E",
    "#16A085",
    "#27AE60",
    "#2980B9",
    "#8E44AD",
    "#2C3E50",
    "#F39C12",
    "#E74C3C",
    "#D35400",
    "#7D3C98",
    "#BDC3C7",
    "#273746",
  ];
  const chartData = languageData.data
    ? Object.entries(languageData.data)
        .sort((a, b) => b[1].solved - a[1].solved)
        .map(([name, solved], index) => ({
          name,
          solved,
          fill: colors[index % colors.length],
        }))
    : [];

  const chartConfig: { [key: string]: { label: string; color?: string } } = {
    questions: {
      label: "Questions",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  let totalSolved = 0;

  chartData.forEach((language, index) => {
    totalSolved += language.solved.solved;
    chartConfig[language.name] = {
      label: language.name,
      color: colors[index % colors.length],
    };
  });

  return (
    <div className="flex flex-col md:flex-row bg-white border-t-2 border-orange-300 rounded-xl hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300 p-6 space-y-6 md:space-y-0 md:space-x-8 text-xl mt-4">
      {/* Guidance Section */}
      <div className="flex-1 flex flex-col justify-center">
  <div className="font-serif bg-neutral-50 hover:shadow-2xl transition-shadow duration-300 rounded-lg p-6">
    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
      Feedback on Performance
    </h2>
    <div className="text-sm md:text-base text-gray-700 leading-relaxed space-y-4">
      {languageData?.guidance?.split("\n").map((line, index) => {
        // Handle bold text
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <h3 key={index} className="font-bold text-gray-800">
              {line.slice(2, -2)}
            </h3>
          );
        }
        // Handle bullet points
        if (line.startsWith("- ")) {
          return (
            <li key={index} className="list-disc ml-6">
              {line.slice(2)}
            </li>
          );
        }
        // Handle links in bullet points
        if (line.startsWith("- [") && line.includes("](")) {
          const textMatch = line.match(/\[.*?\]/);
          const urlMatch = line.match(/\(.*?\)/);
          const text = textMatch ? textMatch[0].slice(1, -1) : ""; // Extract link text
          const url = urlMatch ? urlMatch[0].slice(1, -1) : ""; // Extract URL
          return (
            <li key={index} className="list-disc ml-6">
              <a
                href={url}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {text}
              </a>
            </li>
          );
        }
        // Render normal paragraphs
        return <p key={index}>{line}</p>;
      })}
    </div>
  </div>
</div>


      {/* Pie Chart Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex-1 pb-0">
          <CardHeader className="items-center pb-0">
            <CardTitle>Pie Chart - Based on Your Performance</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square "
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="solved"
                  nameKey="name"
                  outerRadius={150}
                ></Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start text-lg">
            <div className="flex flex-wrap justify-center mt-1 items-center">
              {chartData.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center mx-2 mb-2"
                >
                  <span
                    className="w-4 h-4 inline-block rounded-full"
                    style={{ backgroundColor: item.fill }}
                  ></span>
                  <span className="ml-2 text-sm text-gray-700">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </CardFooter>
        </div>
      </div>
    </div>
  );
}
