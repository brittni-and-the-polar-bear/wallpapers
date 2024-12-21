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

import { ASPECT_RATIOS, CanvasContext, CanvasScreen, ColorSelector, P5Context, Random } from '@batpb/genart';

import { Design } from '../design';

import { Line } from './line';
import { LineThickness } from './line-types';

export interface LinesConfig {
    readonly NAME: string;
    readonly THICKNESS_CATEGORY: LineThickness;
    readonly SAME_THICKNESS: boolean;
    readonly COLOR_SELECTOR: ColorSelector;
}

export abstract class Lines extends CanvasScreen implements Design {
    readonly #LINES: Line[] = [];
    readonly #THICKNESS_CATEGORY: LineThickness;
    readonly #SAME_THICKNESS: boolean;
    readonly #COLOR_SELECTOR: ColorSelector;

    #thickness: number | undefined = undefined;
    #minLineLengthRatio: number = 0.05;
    #maxLineLengthRatio: number = 1;
    #lineTotal: number = 50;

    protected constructor(config: LinesConfig) {
        super(config.NAME);
        this.#THICKNESS_CATEGORY = config.THICKNESS_CATEGORY;
        this.#SAME_THICKNESS = config.SAME_THICKNESS;
        this.#COLOR_SELECTOR = config.COLOR_SELECTOR;
        this.buildLines();
    }

    protected get colorSelector(): ColorSelector {
        return this.#COLOR_SELECTOR;
    }

    protected get lineTotal(): number {
        return this.#lineTotal;
    }

    protected get minLineLengthRatio(): number {
        return this.#minLineLengthRatio;
    }

    protected get maxLineLengthRatio(): number {
        return this.#maxLineLengthRatio;
    }

    public override draw(): void {
        const p5: P5Lib = P5Context.p5;
        p5.background(0);
        this.#LINES.forEach((line: Line): void => {
            line.draw();
        });
    }

    public override keyPressed(): void {
        const p5: P5Lib = P5Context.p5;

        if (p5.key === '1') {
            CanvasContext.updateAspectRatio(ASPECT_RATIOS.SQUARE);
        } else if (p5.key === '2') {
            CanvasContext.updateAspectRatio(ASPECT_RATIOS.PINTEREST_PIN);
        } else if (p5.key === '3') {
            CanvasContext.updateAspectRatio(ASPECT_RATIOS.TIKTOK_PHOTO);
        } else if (p5.key === '4') {
            CanvasContext.updateAspectRatio(ASPECT_RATIOS.SOCIAL_VIDEO);
        }
    }

    public override mousePressed(): void {
        console.log('mousePressed() placeholder');
    }

    public override publishRedraw(): void {
        this.#LINES.forEach((line: Line): void => {
            line.canvasRedraw();
        });
    }

    public save(): void {
        console.log('save() placeholder');
    }

    public saveColors(): void {
        console.log('saveColors() placeholder');
    }

    public savePalette(): void {
        console.log('savePalette() placeholder');
    }

    public saveSet(): void {
        console.log('saveSet() placeholder');
    }

    protected abstract buildLines(): void;

    protected addLine(line: Line): void {
        this.#LINES.push(line);
    }

    protected getThickness(): number {
        let result: number;

        if (this.#SAME_THICKNESS) {
            if (!this.#thickness) {
                this.#thickness = this.#calculateThickness();
            }

            result = this.#thickness;
        } else {
            result = this.#calculateThickness();
        }

        return result;
    }

    #calculateThickness(): number {
        switch (this.#THICKNESS_CATEGORY) {
            case LineThickness.THIN:
                return Random.randomFloat(0.5, 2);
            case LineThickness.MEDIUM:
                return Random.randomFloat(2, 10);
            case LineThickness.THICK:
                return Random.randomFloat(10, 30);
        }
    }
}
