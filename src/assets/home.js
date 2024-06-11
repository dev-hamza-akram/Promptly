import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="512.000000pt"
      height="512.000000pt"
      viewBox="0 0 512.000000 512.000000"
      {...props}
    >
      <Path
        d="M2397 5096c-32-13-75-36-95-50-21-14-526-515-1124-1113C302 3055 87 2835 66 2793c-96-194-64-406 83-554 92-91 209-139 343-139h68v-800c0-541 4-816 11-852 38-182 185-347 367-410 66-23 71-23 554-23 476 0 487 0 514 21 15 11 37 33 48 48 21 27 21 40 26 695l5 668 30 49c38 61 115 110 189 119 28 4 168 5 311 3l260-3 53-29c50-28 82-61 113-116 11-21 15-144 19-692 5-654 5-667 26-694 11-15 33-37 48-48 27-21 38-21 514-21 483 0 488 0 554 23 182 63 329 228 367 410 7 36 11 311 11 852v800h68c188 0 352 100 433 265 34 69 34 71 34 205 0 228 115 93-1169 1376-1276 1277-1148 1167-1366 1172-113 2-130 0-183-22zm247-286c59-28 2149-2121 2171-2172 21-51 19-94-6-144-37-77-68-88-261-94-181-5-194-9-242-74-21-27-21-38-26-934l-5-907-28-47c-15-26-42-59-60-72-70-54-91-56-473-56h-354v560c0 367-4 577-11 612-39 188-190 350-384 411-66 21-88 22-395 22-358 0-376-2-504-67-127-64-245-222-275-366-7-35-11-245-11-612V310h-354c-382 0-403 2-473 56-18 13-45 46-60 72l-28 47-5 907c-5 896-5 907-26 934-48 65-61 69-242 74-193 6-224 17-261 94-25 50-27 93-6 144 21 50 2112 2143 2170 2172 51 25 98 25 149 0z"
        transform="matrix(.1 0 0 -.1 0 512)"
      />
    </Svg>
  )
}

export default SvgComponent
