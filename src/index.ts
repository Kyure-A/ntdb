import { main } from "scripts";
import { test } from "scripts";

(global as any).test = test;
(global as any).main = main;
