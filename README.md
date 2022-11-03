# Virtual List

## Description
Library allows you to display a virtual infinite list of items by only showing visible items on screen. This is very useful for very long list of items.
The most important features are that the library provides dynamic item heights, only measures what it draws, it doesn't need an accurate estimated item height and it allows items to change size at any time.
This library, due to how it is implemented, substantially improves performance on occasions when the collection is modified over time, such as in streaming processes.

## Installation

`npm i @devoinc/virtual-list`

## Usage

````jsx
    <VirtualList items={theItemList} renderItem={item=>(<div>{item.id}</div>)}/>
````

or

````jsx
    <VirtualList items={100000} renderItem={item=>(<div>Item {item + 1}</div>)}/>
````


## Props type

#### (Required) 
* `items` - array | number of items

    Provides the items that will be rendered, if an array is used, the contents are passed to the renderItem function
    as context, otherwise the index is passed

* `renderItem` - function (`item`|`index`, `index`) 

    A function to render the item.  The first parameter is the item or the item's index.  The second is always the index.

#### (Optional) 

* #### `scrollTop` - the scroll position of the component in pixels (default to 0)

* #### `scrollToItem` - scroll to show the specified index at the top of the display

* #### `Wrapper` - the wrapper for items in the grid (defaults to html tag `div`)

    If you need your items to render properly inside a wrapper component then you can provide it here.

    Your component must apply the `style` prop passed to it and render `children`

* #### `Holder` - the overall holder for the grid (defaults to \<div/>)

    If want to provider a component to render the whole of the virtual list you can provide it here.

    Your component must apply the `style` prop passed to it, take a `ref` via `forwardRef` and apply it to the root and render `children`

* #### `useAnimation` - should animation be used to help position items (defaults to true)

    Animation is used in addition to scrolling.  A very minor overhead.

* #### `overscan` - the number of component heights to apply as overscan (defaults to 1)

    Provides a number of pages of overscan

* #### `expectedHeight` - the expected height, can be very rough (defaults to 64)

    Heights are worked out from averages after the first render, so something rough is fine.

* #### `onInit` - function({`getPositionOf`, `getHeightOf`, `getItemFromPosition`, `itemCache`})
 
    Provides access to some api functions that can be useful for modifying the list.  Often
    you will cache these for later use.

    * ##### `getPositionOf(item)` - returns the position of an item

    * ##### `getHeightOf(item)` - returns the height of an item (may be estimated if not measured)

    * ##### `getItemFromPosition(position)` - gets the item that is at a scroll position

    * ##### `itemCache` - a Map containing the cache of all currently rendered items, you can clear this if you like at any time. 

* #### `onSize` - function ({`averageHeight`, `height`, `item`})

    Provides useful information on item sizes so you can resize the component, the most useful being
    averageHeight of an item based on the items drawn.

* #### `onScroll` - function({`items`, `start`, `last`, `scrollPos`, `max`, `scroller`})

    Provides an event that can modify the scroll. You may change `items` in this function. If 
    you insert things above you are probably going to have to update the scroll position
    afterwards.

    * ##### `scroller` - the element being scrolled 

        You might want to fiddle with scrollTop when you add things (especially if going upwards)

    * ##### `items` - the items being rendererd
    * ##### `start` - the first item being rendered (off screen above)
    * ##### `last` - the last item being rendererd (off screen below)
    * ##### `max` - the last item that has been rendered ever (useful for loading more)

    #### Also contains the parameters passed to `onInit`

````javascript 1.8
    function onScroll({max, items}) {
        if (max > items.length - 15) {
            items.push(...Array.from({length: 15}, (_, index) => ({
                id: index + items.length,
                height: Math.random() * 98 + 32 | 0,
                color: rgb(Math.random() * 112 + 143,
                    Math.random() * 112 + 143, Math.random() * 112 + 143)
            })))
        }
    }
````

## Other Properties

Are passed to the wrapping div that does the scrolling (this is not Wrapper, that holds the actual items).

````jsx
    <VirtualList items={1000} renderItem={item=>(<div>{item}</div>)} width={200} height={400}/>
````

* #### `ScrollIndicatorHolder`

    This is a component you can use as a Holder for the VirtualList component. It uses shadows to indicate that scrolling is
    possible.

    You can pass a shadow parameter throw to it via the VirtualList.

````jsx
    <VirtualList shadow={'0 0 32px 14px black'} items={[...items]} Holder={ScrollIndicatorHolder} renderItem={item => {
        return <Item item={item}/>
    }}/>
````

* #### `useMeasurement`

    Provides the ability to measure a component using a resizeObserver - so it will redraw on resize too
    which is handy. ResizeObserver is pony filled.

````javascript 1.8

    const [size, ref] = useMeasurement() 
    return <div ref={ref}>Something is {size.width} x {size.height} at {size.left}, {size.top} </div>

````