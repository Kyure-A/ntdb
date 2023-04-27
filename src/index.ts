import { getTrainDelaying, parseDelayingData } from "scripts";
import { test } from "scripts";

(global as any).getTrainDelaying = getTrainDelaying;
(global as any).parseDelayingData = parseDelayingData;
(global as any).test = test;
