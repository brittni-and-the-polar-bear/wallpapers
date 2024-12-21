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
    PaletteColorSelector,
    ScreenHandler
} from '@batpb/genart';

import {FallingLines, LinesConfig, LineThickness} from './lines';

function sketch(p5: P5Lib): void {
    p5.setup = (): void => {
        P5Context.initialize(p5);
        CanvasContext.buildCanvas(ASPECT_RATIOS.SQUARE, 720, p5.P2D, true);

        const selector: ColorSelector = new PaletteColorSelector(BRITTNI_PALETTE);

        const config: LinesConfig = {
            NAME: 'Falling Lines',
            THICKNESS_CATEGORY: LineThickness.MEDIUM,
            SAME_THICKNESS: false,
            COLOR_SELECTOR: selector
        }

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
}

new P5Lib(sketch);
