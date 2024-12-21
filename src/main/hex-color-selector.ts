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

import {Color, ColorSelector, ColorSelectorType, P5Context,} from "@batpb/genart";
import P5Lib from "p5";

export class HexColorSelector extends ColorSelector {
    public constructor(random: boolean, hexes: string[]) {
        super('hex color selector', random);
        const p5: P5Lib = P5Context.p5;

        for (const hex of hexes) {
            const c: Color = new Color(p5.color(hex));
            this.addColorChoice(c);
        }
    }

    public override get type(): ColorSelectorType {
        return ColorSelectorType.RGB;
    }

    public override getColor(): Color {
        return this.selectColorFromChoices();
    }
}