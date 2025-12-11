'use client';

import {
  File, FileImage, FileVideo, FileText, 
  FileArchive, FileCode, FileSpreadsheet, 
  FileChartColumn, FileType
} from "lucide-react";

export function getFileIcon(filename) {
  const ext = filename.split('.').pop().toLowerCase();

  const map = {
    png: FileImage,
    jpg: FileImage,
    jpeg: FileImage,
    gif: FileImage,
    svg: FileImage,
    webp: FileImage,

    mp4: FileVideo,
    mkv: FileVideo,
    avi: FileVideo,

    pdf: FileText,
    txt: FileText,
    md: FileText,

    zip: FileArchive,
    rar: FileArchive,
    "7z": FileArchive,

    js: FileCode,
    ts: FileCode,
    json: FileCode,
    html: FileCode,
    css: FileCode,

    xls: FileSpreadsheet,
    xlsx: FileSpreadsheet,

    csv: FileSpreadsheet,

    ppt: FileChartColumn,
    pptx: FileChartColumn,
  };

  return map[ext] || FileType;
}
