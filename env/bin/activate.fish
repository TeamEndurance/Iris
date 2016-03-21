<<<<<<< HEAD
# This file must be used with "source bin/activate.fish" *from fish* (http://fishshell.com)
# you cannot run it directly

function deactivate  -d "Exit virtualenv and return to normal shell environment"
    # reset old environment variables
    if test -n "$_OLD_VIRTUAL_PATH" 
        set -gx PATH $_OLD_VIRTUAL_PATH
        set -e _OLD_VIRTUAL_PATH
    end
=======
# This file must be used using `. bin/activate.fish` *within a running fish ( http://fishshell.com ) session*.
# Do not run it directly.

function deactivate -d 'Exit virtualenv mode and return to the normal environment.'
    # reset old environment variables
    if test -n "$_OLD_VIRTUAL_PATH"
        set -gx PATH $_OLD_VIRTUAL_PATH
        set -e _OLD_VIRTUAL_PATH
    end

>>>>>>> fe78b6a1d44e13e192ee18b9a76be07cff10532e
    if test -n "$_OLD_VIRTUAL_PYTHONHOME"
        set -gx PYTHONHOME $_OLD_VIRTUAL_PYTHONHOME
        set -e _OLD_VIRTUAL_PYTHONHOME
    end
<<<<<<< HEAD
    
    if test -n "$_OLD_FISH_PROMPT_OVERRIDE"
        # set an empty local fish_function_path, so fish_prompt doesn't automatically reload
        set -l fish_function_path
        # erase the virtualenv's fish_prompt function, and restore the original
=======

    if test -n "$_OLD_FISH_PROMPT_OVERRIDE"
        # Set an empty local `$fish_function_path` to allow the removal of `fish_prompt` using `functions -e`.
        set -l fish_function_path

        # Erase virtualenv's `fish_prompt` and restore the original.
>>>>>>> fe78b6a1d44e13e192ee18b9a76be07cff10532e
        functions -e fish_prompt
        functions -c _old_fish_prompt fish_prompt
        functions -e _old_fish_prompt
        set -e _OLD_FISH_PROMPT_OVERRIDE
    end
<<<<<<< HEAD
    
    set -e VIRTUAL_ENV
    if test "$argv[1]" != "nondestructive"
        # Self destruct!
=======

    set -e VIRTUAL_ENV

    if test "$argv[1]" != 'nondestructive'
        # Self-destruct!
        functions -e pydoc
>>>>>>> fe78b6a1d44e13e192ee18b9a76be07cff10532e
        functions -e deactivate
    end
end

<<<<<<< HEAD
# unset irrelevant variables
deactivate nondestructive

set -gx VIRTUAL_ENV "/home/tilak/Iris/env"
=======
# Unset irrelevant variables.
deactivate nondestructive

set -gx VIRTUAL_ENV "/home/devaraj/iris/Iris/env"
>>>>>>> fe78b6a1d44e13e192ee18b9a76be07cff10532e

set -gx _OLD_VIRTUAL_PATH $PATH
set -gx PATH "$VIRTUAL_ENV/bin" $PATH

<<<<<<< HEAD
# unset PYTHONHOME if set
=======
# Unset `$PYTHONHOME` if set.
>>>>>>> fe78b6a1d44e13e192ee18b9a76be07cff10532e
if set -q PYTHONHOME
    set -gx _OLD_VIRTUAL_PYTHONHOME $PYTHONHOME
    set -e PYTHONHOME
end

<<<<<<< HEAD
if test -z "$VIRTUAL_ENV_DISABLE_PROMPT"
    # fish uses a function instead of an env var to generate the prompt.
    
    # copy the current fish_prompt function as the function _old_fish_prompt
    functions -c fish_prompt _old_fish_prompt
    
    # with the original prompt function copied, we can override with our own.
    function fish_prompt
        # Prompt override?
        if test -n ""
            printf "%s%s" "" (set_color normal)
            _old_fish_prompt
            return
        end
        # ...Otherwise, prepend env
        set -l _checkbase (basename "$VIRTUAL_ENV")
        if test $_checkbase = "__"
            # special case for Aspen magic directories
            # see http://www.zetadev.com/software/aspen/
            printf "%s[%s]%s " (set_color -b blue white) (basename (dirname "$VIRTUAL_ENV")) (set_color normal) 
            _old_fish_prompt
        else
            printf "%s(%s)%s" (set_color -b blue white) (basename "$VIRTUAL_ENV") (set_color normal)
            _old_fish_prompt
        end
    end 
    
=======
function pydoc
    python -m pydoc $argv
end

if test -z "$VIRTUAL_ENV_DISABLE_PROMPT"
    # Copy the current `fish_prompt` function as `_old_fish_prompt`.
    functions -c fish_prompt _old_fish_prompt

    function fish_prompt
        # Save the current $status, for fish_prompts that display it.
        set -l old_status $status

        # Prompt override provided?
        # If not, just prepend the environment name.
        if test -n ""
            printf '%s%s' "" (set_color normal)
        else
            printf '%s(%s%s%s) ' (set_color normal) (set_color -o white) (basename "$VIRTUAL_ENV") (set_color normal)
        end

        # Restore the original $status
        echo "exit $old_status" | source
        _old_fish_prompt
    end

>>>>>>> fe78b6a1d44e13e192ee18b9a76be07cff10532e
    set -gx _OLD_FISH_PROMPT_OVERRIDE "$VIRTUAL_ENV"
end
