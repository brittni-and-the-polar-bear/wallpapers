/*
 * Copyright (C) 2023-2024 brittni and the polar bear LLC.
 *
 * This file is a part of brittni and the polar bear's wallpapers algorithmic art project,
 * which is released under the GNU Affero General Public License, Version 3.0.
 * You may not use this file except in compliance with the license.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. See LICENSE or go to
 * https://www.gnu.org/licenses/agpl-3.0.en.html for full license details.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * The visual outputs of this source code are licensed under the
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License.
 * You should have received a copy of the CC BY-NC-ND 4.0 License with this program.
 * See OUTPUT-LICENSE or go to https://creativecommons.org/licenses/by-nc-nd/4.0/
 * for full license details.
 */

import P5Lib from 'p5';

import '../../assets/styles/sketch.css';

import {
    ASPECT_RATIOS,
    BRITTNI_PALETTE,
    CanvasContext,
    CanvasScreen, ColorSelector,
    P5Context,
    PaletteColorSelector, Random,
    ScreenHandler
} from '@batpb/genart';

import { FallingLines, LinesConfig, LineThickness } from './lines';
import {HexColorSelector} from "./hex-color-selector";

interface Palette {
    name: string;
    colors: string[];
}

function sketch(p5: P5Lib): void {
    p5.setup = (): void => {
        P5Context.initialize(p5);
        CanvasContext.buildCanvas(ASPECT_RATIOS.SQUARE, 720, p5.P2D, true);
        const palettes: Palette[] = buildPalettes();
        const palette: Palette | undefined = Random.randomElement(palettes);
        let selector: ColorSelector;

        if (palette) {
            selector = new HexColorSelector(true, palette.colors);
        } else {
            selector = new PaletteColorSelector(BRITTNI_PALETTE);
        }

        const config: LinesConfig = {
            NAME: 'Falling Lines',
            THICKNESS_CATEGORY: LineThickness.MEDIUM,
            SAME_THICKNESS: false,
            COLOR_SELECTOR: selector
        };

        const fallingLines: CanvasScreen = new FallingLines(config);
        ScreenHandler.addScreen(fallingLines);
        ScreenHandler.currentScreen = fallingLines.NAME;
    };

    p5.draw = (): void => {
        ScreenHandler.draw();
    };

    p5.keyPressed = (): void => {
        ScreenHandler.keyPressed();
    };

    p5.mousePressed = (): void => {
        ScreenHandler.mousePressed();
    };

    p5.windowResized = (): void => {
        CanvasContext.resizeCanvas();
    };

    function buildPalettes(): Palette[] {
        return [
            {name: 'winter blues', colors: ['#dfebf1', '#a4c0df', '#7a9ec7', '#3e6589', '#052542']},
            {name: 'winter calm', colors: ['#badaee', '#8cc2e3', '#61879e', '#b7bee1', '#dedede']},
            {name: 'dark winter', colors: ['#e3d4ed', '#c9c1cd', '#baaac5', '#8f81a7', '#775a90']},
            {name: 'mindful palette no. 104', colors: ['#f7f4e9', '#ebdbc1', '#7d8778', '#74583e', '#5e4662', '#131210']}
        ];
    }
}

new P5Lib(sketch);
