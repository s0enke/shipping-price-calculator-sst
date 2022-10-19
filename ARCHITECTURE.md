## Architectural Decision Records

## Context

This project showcases a demo application for a DHL shipping costs calculator.

It's also meant to explore different frontends (React, NextJs, Remix) as a front-end knowledge refresher.

## Decision

 - Use AWS and serverless technologies
 - Use SST (Serverless Stack) for development and deployment
 - Use Tailwind for CSS/UI

### Serverless Stack SST

 - SST is a CDK add-on, fully compatible, full CDK ecosystem usable
 - simplifies local development 
 - comes with unit and integration test suite
 - has good abstractions for APIs
 - CDK-based deployment included, so ready for ephemeral environmenta and ci/cd
 - native React/Next/Remix integration for development and deployment

### JavaScript Frameworks

Differences noted during exploration of different frameworks: 

| | React | Next | Remix | 
|---|---|---|---|
| Extra middleware needed| No 👍 | No 👍 | Yes 👎 |
| Lambda-Edge complexity (SST constraint) | No 👍 | Yes 👎 | No 👍 |
| Caching ootb | Yes 👍 | Yes 👍 | No 👎 |

As a result, for this scenario, plain React seem to make the most sense.

## Impact

 - no managed services / infrastructure apart from AWS is needed
 - all components are serverless, resilient/auto-healing, and auto-scaled by default 

## Known issues

 - The calculations could also be done in the frontend, which would remove the need for an API/Backend.
 - Backend/API has no caching, could be enabled
 - Query Parameter Validation is partially missing in the backend
 - Backend is not fully restful, etc. it should throw 400 on bad input parameters