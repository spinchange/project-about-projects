# Scaffolding Architecture

## Purpose

Scaffolding in this system should not be treated as a single feature.

It operates at three different layers:

1. Skill
2. IDE extension
3. MCP

Each layer solves a different part of the scaffolding problem.

## Core Principle

Copying files is the smallest part of scaffolding.

The real work is:

- deciding what should exist
- deciding what should not exist yet
- placing artifacts where they fit the current maturity of the project
- avoiding duplicate or premature structure

## The Three Layers

### 1. Skill Layer

The Skill handles judgment.

It answers:

- what kind of project is this?
- how much structure is appropriate right now?
- what should be scaffolded first?
- what should be deferred?

This is the layer that turns vague intent into the right scaffold shape.

### 2. IDE Extension Layer

The extension handles low-friction execution.

It answers:

- how do we create artifacts quickly inside the IDE?
- how do we insert templates without context switching?
- how do we let users create slices, handoffs, and tracking files where they already work?

This is the ergonomics layer.

### 3. MCP Layer

The MCP handles context-aware orchestration.

It answers:

- what already exists?
- what is missing?
- what is duplicated?
- what is the next scaffold step instead of a full scaffold reset?

This is the selective governance layer.

## Recommended Sequence

### First: Skill

Build the Skill first because scaffold choice is still judgment-heavy.

The system is not mature enough yet to treat scaffolding as pure automation.

### Second: IDE Extension

Build extension scaffold commands second because once the artifact shapes stabilize, users benefit from low-friction creation.

### Third: MCP

Build the MCP after that, when the system has stable artifact conventions and enough structure to support context-aware selective scaffolding.

## Shared Concepts

All three layers should use the same vocabulary:

- brief
- spec
- plan
- slice
- handoff
- debug log
- tracking kit
- milestone brief
- weekly status

They should also share the same scaffold modes:

- `minimal`
- `tracked`
- `execution-ready`

## Shared Failure Modes

All three layers should avoid:

- creating duplicate artifacts
- scaffolding more than the project can support
- generating docs that immediately become stale
- hiding uncertainty behind template completion
- making a project look more mature than it really is

## Success Criteria

The overall scaffolding system succeeds if:

- projects start with the right amount of structure
- users can create missing artifacts quickly
- the system can later detect what still needs to exist
- scaffolding supports execution instead of becoming decorative bureaucracy
