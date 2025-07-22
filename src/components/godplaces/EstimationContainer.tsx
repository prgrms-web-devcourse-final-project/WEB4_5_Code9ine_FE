'use client';
import { useSelectedLayoutSegment } from 'next/navigation';
import EstimationBox from './EstimationBox';

export default function EstimationContainer() {
  const segment = useSelectedLayoutSegment('results');

  const isDetail = segment === 'detail';

  return <>{!isDetail && <EstimationBox />}</>;
}
