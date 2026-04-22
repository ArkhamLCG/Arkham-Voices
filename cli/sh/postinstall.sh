#!/bin/bash

tsx ./cli/init-icons.ts
tsx ./cli/download-icon-font.ts
tsx ./cli/download-campaigns.ts
tsx ./cli/detect-languages.ts
tsx ./cli/keep-narration.ts