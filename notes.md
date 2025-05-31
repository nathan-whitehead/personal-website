There are multiple color uses:

1. Backgrounds/surfaces
2. Text
3. Borders
4. Icons

Backgrounds need to be mostly muted, neutral colors
Text needs a lot of variations. Neutral contrasting with the background, light variants contrasting with icons, colored variants for emphasis, hyperlinks, etc
Border colors - need similar colors as text (reuse text), and for more subtle borders use darker forms of background colors
Icons need bright colors, both brand colors, and functional such as danger, warning, etc.


naming convention:

background colors are sf-elevation (1-5)

text/line colors are ln-variant-elevation (1-2) 
	variants would include: [normal, muted, light, primary, secondary, danger, warning, info, success]
	
border colors are bd-(variant?)-elevation (1-5)
	this is generally a slightly darker version of the surface color. Line colors could also easily be used for borders (hence generic name “line”)
	
Icon colors are icn-variant-elevation (1-3)
	variants include the same as lines

Current theme template:

```css
  /* semantic color abstractions - <THEME> theme */
  /* Intention is to stack elevations, so a hover on a sf-1 would be sf-2 */
  /* surface colors, elevations 1-5 */
  --color-sf-1:
  --color-sf-2:
  --color-sf-3:
  --color-sf-4:
  --color-sf-5:

  /* line/text colors normal elevations 1-3 */
  --color-ln-1:
  --color-ln-2:
  /* muted is intended to be much more similar to the sf colors */
  --color-ln-muted-1:
  --color-ln-muted-2:
  /* light colors are intended to use on icons or dark surfaces */
  --color-ln-light-1:
  --color-ln-light-2:
  --color-ln-dark-1:
  --color-ln-dark-2:
  /* line colors primary and secondary */
  --color-ln-primary-1:
  --color-ln-primary-2:
  --color-ln-secondary-1:
  --color-ln-secondary-2:
  /* line colors in functional colors */
  --color-ln-danger-1:
  --color-ln-danger-2:
  --color-ln-warning-1:
  --color-ln-warning-2:
  --color-ln-info-1:
  --color-ln-info-2:
  --color-ln-success-1:
  --color-ln-success-2:

  /* border colors */
  --color-bd-1:
  --color-bd-2:
  --color-bd-3:
  --color-bd-4:
  --color-bd-5:

  /* Icon colors */
  --color-icn-primary-1:
  --color-icn-primary-2:
  --color-icn-secondary-1:
  --color-icn-secondary-2:
  /* Icon colors in functional colors */
  --color-icn-danger-1:
  --color-icn-danger-2:
  --color-icn-warning-1:
  --color-icn-warning-2:
  --color-icn-info-1:
  --color-icn-info-2:
  --color-icn-success-1:
  --color-icn-success-2:
```