import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Download, ExternalLink, CheckCircle } from 'lucide-react';
import { toPng } from 'html-to-image';

// Base64 logo for reliable image capture
const LOGO_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbRIAb9B6UQREAnbwAZOTZ9SZ7ZpXRE68MDJFFEuXPis8XPJGEVmZlVWhXmPFPV5rX2o6p5pkf679GZ2KzbW33XWf57D2V9rrvOf85R58E54BPS7qJ67q+3H6wH1767y8+v/BInyL6u93+j75N6Ceg3yD/Bv0p5eDAnAByAAdYAA88H+X4AtuA6+AAu++LMDyAiYA3m7+h9n6063WqN7u0O+7dZ1lAAs8BB/Bv9h/+Xf4/50L/P8fG37z+vXj65u++d9u23/+v/7H5+o3T+O3q6vHze+fnb9//f/1f53uDzy+q+v2vfvS9X/vK868/z+qvv+n9u9v7O/O7vb9v6/8/ev/jH3A86P8C+Bv3vj0w20D7Af6S8CfAPzV6oG/Bv/36Xf6R+Afx++Ef3/7Xf7f/Bf+AewfAP8p8Bv+B/u+77v/9m/t655nruu+53re/rK99v2veT+K97fS/9v+v/3/v37/f/7/f///u9v7m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v9m/v7n/v8=";

const ResultCard = ({ teacher }) => {
  const cardRef = useRef(null);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(teacher.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    
    try {
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true, 
        pixelRatio: 3,
        backgroundColor: '#ffffff'
      });

      // Handle Mobile Sharing (More reliable than download links)
      if (navigator.share && navigator.canShare) {
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], `QR-${teacher.name}.png`, { type: 'image/png' });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `QR - ${teacher.name}`,
            text: `باركود المعلمة: ${teacher.name}`,
          });
          return;
        }
      }

      // Desktop Fallback / Standard Download
      const link = document.createElement('a');
      link.download = `QR-${teacher.name}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Save failed:', err);
      // Last resort: Open in new tab for manual save
      if (typeof dataUrl !== 'undefined') {
        const win = window.open();
        win.document.write('<img src="' + dataUrl + '" style="width:100%" />');
      }
    }
  };

  if (!teacher) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="max-w-md mx-auto w-full px-4 mt-8 pb-12"
    >
      <div className="ios-card overflow-hidden">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-slate-800 mb-1 text-center">
            {teacher.name}
          </h2>
          <p className="text-slate-400 text-sm mb-6">رقم الهوية: {teacher.id}</p>
          
          {/* Printable Area */}
          <div className="p-4 bg-white rounded-2xl border border-slate-100 mb-6" ref={cardRef}>
             <div className="flex flex-col items-center p-2 bg-white">
                <p className="text-[10px] text-slate-400 mb-2 font-bold uppercase tracking-widest">مدرسة بحرة المجاهدين الثانية</p>
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-50">
                   <QRCodeCanvas 
                    value={teacher.link} 
                    size={160}
                    level="H"
                    includeMargin={false}
                    imageSettings={{
                      src: LOGO_BASE64,
                      height: 32,
                      width: 32,
                      excavate: true,
                    }}
                  />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-700">{teacher.name}</p>
             </div>
          </div>

          <div className="w-full space-y-3">
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  {copied ? <CheckCircle className="text-green-500" size={20} /> : <Copy className="text-blue-500" size={20} />}
                </div>
                <span className="font-semibold text-slate-700">{copied ? 'تم النسخ!' : 'نسخ رابط المجلد'}</span>
              </div>
              <ExternalLink size={18} className="text-slate-300 group-hover:text-slate-400" />
            </button>

            <button
              onClick={handleDownload}
              className="ios-button-primary w-full flex items-center justify-center gap-3"
            >
              <Download size={20} />
              <span>حفظ الباركود كصورة</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
