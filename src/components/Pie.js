import * as React from "react";

// matplotlib's tab20
// for color in mpl.cm.tab20.colors:
//     c = np.floor(np.array(color) * 256).astype(int)
//     print(f"rgb({' '.join([str(x) for x in c])})")
const colors = [
  "rgb(31 119 180)",
  "rgb(174 199 232)",
  "rgb(256 127 14)",
  "rgb(256 187 120)",
  "rgb(44 160 44)",
  "rgb(152 223 138)",
  "rgb(214 39 40)",
  "rgb(256 152 150)",
  "rgb(148 103 189)",
  "rgb(197 176 213)",
  "rgb(140 86 75)",
  "rgb(196 156 148)",
  "rgb(227 119 194)",
  "rgb(247 182 210)",
  "rgb(127 127 127)",
  "rgb(199 199 199)",
  "rgb(188 189 34)",
  "rgb(219 219 141)",
  "rgb(23 190 207)",
  "rgb(158 218 229)",
];

function Empty({ label }) {
  return (
    <>
      <circle cx="50" cy="50" r="50" />
      {label && (
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominant-baseline="middle"
          font="13px sans-serif"
          fill="white"
        >
          {label}
        </text>
      )}
    </>
  );
}

function sum(a, b) {
  return a + b;
}

function radians(a) {
  return (a * Math.PI) / 180;
}

function Wedge({ label, start, arcLength, color, textColor }) {
  const radius = 25;
  const circumference = 2 * 3.141596 * radius;
  const rotation = `rotate(${-90 + start})`;
  const on = (arcLength / 360) * circumference;
  const off = ((360 - arcLength) / 360) * circumference;
  const dash = `${on} ${off}`;

  // label coordinates
  const a = start + arcLength / 2;
  const x = 50 - radius * 1.25 * Math.sin(-radians(a));
  const y = 50 - radius * 1.25 * Math.cos(-radians(a));

  return (
    <>
      <circle
        r={radius}
        cx="50"
        cy="50"
        fill="transparent"
        stroke={color}
        strokeWidth="50"
        strokeDasharray={dash}
        transform-origin="50 50"
        transform={rotation}
      />
      {label && (
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominant-baseline="middle"
          style={{
            font: "10px sans-serif",
          }}
          fill={textColor || "white"}
        >
          {label}
        </text>
      )}
    </>
  );
}

function LegendHandle({ x, y, color, label }) {
  return (
    <g>
      <rect x={x} y={y} width={4} height={4} fill={color} />
      <text
        x={x + 8}
        y={y + 2}
        dominantBaseline="middle"
        style={{
          font: "4px sans-serif",
        }}
        fill="black"
      >
        {label}
      </text>
    </g>
  );
}

function Legend({ labels, colors }) {
  return (
    <g>
      {labels.map((label, i) => (
        <LegendHandle
          key={label}
          x={110}
          y={2 + 8 * i}
          label={label}
          color={colors[i]}
        />
      ))}
    </g>
  );
}

export default function Pie({
  values,
  maximum,
  labels,
  legend,
  labelWedges,
  title,
}) {
  const width = legend ? 200 : 100;

  return (
    <svg viewBox={`0 0 ${width} 115`} xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#f0f0f0" />
      {values.map((value, i) => (
        <Wedge
          key={i}
          label={labelWedges && value}
          start={(values.slice(0, i).reduce(sum, 0) / maximum) * 360}
          arcLength={(value / maximum) * 360}
          color={colors[i % colors.length]}
        />
      ))}
      {labels?.length && legend && (
        <Legend
          colors={labels.map((_, i) => colors[i % colors.length])}
          labels={labels}
        />
      )}
      {title && (
        <text
          x={50}
          y={109}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            font: "6px sans-serif",
          }}
          fill="black"
        >
          {title}
        </text>
      )}
    </svg>
  );
}
