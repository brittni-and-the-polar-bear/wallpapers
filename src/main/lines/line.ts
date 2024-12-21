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

import P5Lib from 'p5';

import { CanvasContext, CanvasRedrawListener, Color, Coordinate, CoordinateMode, P5Context } from '@batpb/genart';

export class Line implements CanvasRedrawListener {
    #start: Coordinate;
    #end: Coordinate;
    #strokeWeightMultiplier: number = 1;
    #color: Color;

    public constructor(startCoordinate: Coordinate, endCoordinate: Coordinate, color: Color, strokeWeightMultiplier?: number) {
        this.#start = startCoordinate;
        this.#end = endCoordinate;
        this.#color = color;

        if (strokeWeightMultiplier) {
            this.#strokeWeightMultiplier = strokeWeightMultiplier;
        }
    }

    public draw(): void {
        const startX: number = this.#start.getX(CoordinateMode.CANVAS);
        const startY: number = this.#start.getY(CoordinateMode.CANVAS);
        const endX: number = this.#end.getX(CoordinateMode.CANVAS);
        const endY: number = this.#end.getY(CoordinateMode.CANVAS);
        const p5: P5Lib = P5Context.p5;
        p5.strokeWeight(CanvasContext.defaultStroke * this.#strokeWeightMultiplier);
        p5.stroke(this.#color.color);
        p5.line(startX, startY, endX, endY);
    }

    public canvasRedraw(): void {
        this.#start.remap();
        this.#end.remap();
    }
}
