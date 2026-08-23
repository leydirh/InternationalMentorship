import React from "react";
import CourseDetailClient from "./CourseDetailClient";

export function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "default" },
  ];
}

export default function CourseDetailPage() {
  return <CourseDetailClient />;
}
