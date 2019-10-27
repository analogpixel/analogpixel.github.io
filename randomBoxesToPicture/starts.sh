#!/bin/bash

tmux -2 \
	new-session -s wiki-dev   \; \
	new-window -t "wiki-dev" -n bash "bash --login -c"  \; \
  new-window -t "wiki-dev" -n bs "browser-sync start --server --directory --files \"*\""  \; \
	select-window -t "wiki-dev:0"
