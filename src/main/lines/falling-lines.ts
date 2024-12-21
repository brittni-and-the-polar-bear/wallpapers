/*
 * Copyright (C) 2024 brittni and the polar bear LLC.
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

// vertical solid color lines

import { Lines, LinesConfig } from './lines';
import P5Lib from "p5";
import {Color, Coordinate, CoordinateMapper, CoordinateMode, P5Context, Random} from "@batpb/genart";
import {Line} from "./line";

export class FallingLines extends Lines {
    public constructor(config: LinesConfig) {
        super(config);
    }

    protected buildLines(): void {
        const p5: P5Lib = P5Context.p5;
        const canvasWidth: number = p5.width;
        const canvasHeight: number = p5.height;
        let minLineLength: number = canvasHeight * this.minLineLengthRatio;
        let maxLineLength: number = canvasHeight * this.maxLineLengthRatio;
        const spaceX: number = canvasWidth / this.lineTotal;
        let startX: number = Random.randomFloat(0, spaceX);

        while (startX < CoordinateMapper.maxX) {
            const startY: number = 0;
            const endX: number = startX;
            let possibleLength: number = maxLineLength;

            // if (this.#maxLength === MaxLength.RIGHT) {
            //     length = p5.map(startX, CoordinateMapper.minX, CoordinateMapper.maxX, minLineLength, maxLineLength);
            // } else if (this.#maxLength === MaxLength.LEFT) {
            //     length = p5.map(startX, CoordinateMapper.minX, CoordinateMapper.maxX, maxLineLength, minLineLength);
            // } else {
            //     possibleLength = maxLineLength;
            // }

            const endY: number = Random.randomFloat(minLineLength, possibleLength);
            const color: Color = this.colorSelector.getColor();
            const start: Coordinate = new Coordinate();
            start.setPosition(new P5Lib.Vector(startX, startY), CoordinateMode.CANVAS);
            const end: Coordinate = new Coordinate();
            end.setPosition(new P5Lib.Vector(endX, endY), CoordinateMode.CANVAS);
            this.addLine(new Line(start, end, color));
            startX += Random.randomFloat(spaceX * 0.25, spaceX * 1.25);
        }
    }
}
