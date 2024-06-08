# dmenu

A `dmenu`-like extension for Raycast.

Inspired by [this orange website commenter](https://news.ycombinator.com/item?id=40606300).

## Usage

1. [Install the extension.](#installation)
2. Download the [dmenu_raycast](./dmenu_raycast) script and put it somewhere in your `$PATH`
3. Run something like `printf 'one\ntwo\nthree' | dmenu_raycast`

`dmenu_raycast` will either print the selected item to stdout, or exit 0 if the user cancelled without selecting an item.

Whitespace is stripped, but this might change in the future once I check if `dmenu` also does that lol.

**TODO:** `-p` (prompt) support

## Installation

TODO
