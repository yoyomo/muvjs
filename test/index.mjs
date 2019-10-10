"use strict";
import {muv} from './muvjs/muv.mjs';
import {init, update, view} from './App.mjs'


muv(init)(update)(view)("root");