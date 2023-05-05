import { main } from "modules";
import { newTrigger } from "modules";
import { test } from "modules";

(global as any).main = main;
(global as any).newTrigger = newTrigger;
(global as any).test = test;
