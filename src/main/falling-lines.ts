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

import {
    CanvasContext,
    CanvasScreen,
    Color, ColorSelector,
    Coordinate, CoordinateMapper,
    CoordinateMode,
    P5Context,
    Palette,
    PaletteColorSelector,
    Random
} from '@batpb/genart';

class Line {
    startCoordinate: Coordinate;
    endCoordinate: Coordinate;
    color: Color;

    public constructor(startCoordinate: Coordinate, endCoordinate: Coordinate, color: Color) {
        this.startCoordinate = startCoordinate;
        this.endCoordinate = endCoordinate;
        this.color = color;
    }

    public draw(): void {
        const startX: number = this.startCoordinate.getX(CoordinateMode.CANVAS);
        const startY: number = this.startCoordinate.getY(CoordinateMode.CANVAS);
        const endX: number = this.endCoordinate.getX(CoordinateMode.CANVAS);
        const endY: number = this.endCoordinate.getY(CoordinateMode.CANVAS);
        const p5: P5Lib = P5Context.p5;
        p5.strokeWeight(CanvasContext.defaultStroke);
        p5.stroke(this.color.color);
        p5.line(startX, startY, endX, endY);
    }
}

enum LineDirection {
    HORIZONTAL,
    HORIZONTAL_LEFT,
    HORIZONTAL_RIGHT,
    HORIZONTAL_CENTER,
    VERTICAL,
    VERTICAL_UP,
    VERTICAL_DOWN,
    VERTICAL_CENTER,
    DIAGONAL
}

enum MaxLength {
    LEFT,
    RIGHT,
    NONE
}

export class FallingLines extends CanvasScreen {
    readonly DESIGN_NAME: string;
    palette: Palette;
    #lineTotal: number;
    #minLineLengthRatio: number;
    #maxLineLengthRatio: number;
    #lineDirection: LineDirection = LineDirection.VERTICAL_DOWN;
    readonly #LINES: Line[] = [];
    #colorSelector: ColorSelector;
    #maxLength: MaxLength = MaxLength.LEFT;

    public constructor(palette: Palette) {
        super('Falling Lines');
        this.DESIGN_NAME = 'Falling Lines';
        this.palette = palette;
        this.#lineTotal = Random.randomInt(5, 100);
        this.#minLineLengthRatio = 0.1;
        this.#maxLineLengthRatio = 1;
        this.#colorSelector = new PaletteColorSelector(this.palette);
        this.#buildLines();
    }

    public save(): void {
        console.log('save() placeholder');
    }

    public savePalette(): void {
        console.log('savePalette() placeholder');
    }

    public saveSet(): void {
        console.log('saveSet() placeholder');
    }

    public draw(): void {
        const p5: P5Lib = P5Context.p5;
        p5.background(0);
        for (const line of this.#LINES) {
            line.draw();
        }
    }

    public keyPressed(): void {
        console.log('keyPressed() placeholder');
    }

    public mousePressed(): void {
        console.log('mousePressed() placeholder');
    }

    #buildLines(): void {
        const p5: P5Lib = P5Context.p5;
        const canvasWidth: number = p5.width;
        const canvasHeight: number = p5.height;
        let minLineLength: number;
        let maxLineLength: number;

        if (this.#lineDirection === LineDirection.VERTICAL_DOWN) {
            minLineLength = canvasHeight * this.#minLineLengthRatio;
            maxLineLength = canvasHeight * this.#maxLineLengthRatio;

            const spaceX: number = canvasWidth / this.#lineTotal;
            let startX: number = Random.randomFloat(0, spaceX);

            while (startX < CoordinateMapper.maxX) {
                const startY: number = 0;
                const endX: number = startX;
                let maxL: number;

                if (this.#maxLength === MaxLength.RIGHT) {
                    maxL = p5.map(startX, CoordinateMapper.minX, CoordinateMapper.maxX, minLineLength, maxLineLength);
                } else if (this.#maxLength === MaxLength.LEFT) {
                    maxL = p5.map(startX, CoordinateMapper.minX, CoordinateMapper.maxX, maxLineLength, minLineLength);
                } else {
                    maxL = maxLineLength;
                }

                const endY: number = Random.randomFloat(minLineLength, maxL);
                const color: Color = this.#colorSelector.getColor();
                const start: Coordinate = new Coordinate();
                start.setPosition(new P5Lib.Vector(startX, startY), CoordinateMode.CANVAS);
                const end: Coordinate = new Coordinate();
                end.setPosition(new P5Lib.Vector(endX, endY), CoordinateMode.CANVAS);
                this.#LINES.push(new Line(start, end, color));
                startX += Random.randomFloat(spaceX * 0.25, spaceX * 1.25);
            }
        }
    }
}
