import { main } from "scripts";
import { newTrigger } from "scripts";
import { test } from "scripts";

(global as any).main = main;
(global as any).newTrigger = newTrigger;
(global as any).test = test;
