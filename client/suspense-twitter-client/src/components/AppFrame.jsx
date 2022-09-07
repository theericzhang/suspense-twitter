import React, { Suspense } from "react";
import Wrapper from "./Wrapper";

export default function AppFrame() {
    const WrapperLazy = React.lazy(() => import('./Wrapper'));
    return (
        <div className="app-frame">
            {/* <Suspense fallback={<p>Loading....</p>}>
                <WrapperLazy />
            </Suspense> */}
            <Wrapper />
        </div>
    )
}