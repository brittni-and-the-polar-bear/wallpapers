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

import { CanvasScreen } from '@batpb/genart';

import { Design } from '../design';

import { Line } from './line';

export abstract class Lines extends CanvasScreen implements Design {
    readonly #LINES: Line[] = [];

    protected constructor(name: string) {
        super(name);
    }

    public override draw(): void {
        this.#LINES.forEach((line: Line): void => {
            line.draw();
        });
    }

    protected addLine(line: Line): void {
        this.#LINES.push(line);
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
}
