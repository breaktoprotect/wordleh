from distutils.log import debug
from tkinter import W
from turtle import position
from unittest import skip
from english_words import english_words_lower_alpha_set as WORDS
import collections

#* Retrieve words with a specific length
def get_n_letter_words(wordlist, length):
    return list(filter(lambda x: len(x)==length, wordlist))

#* Get a wordlist filtering out repeated letters
def get_filtered_words_no_letter_repeat(wordlist):
    filtered_wordlist = []
    for word in wordlist:
        if is_no_letter_repeat(word):
            filtered_wordlist.append(word)

    return filtered_wordlist

#* Wordlist filtered out specific letters
def filtered_words_excluding_letters(wordlist, excluded_letters):
    new_wordlist = []

    for word in wordlist:
        contain_excluded = False
        for letter in excluded_letters:
            if letter in word:
                contain_excluded = True
        if not contain_excluded:    
            new_wordlist.append(word)

    return new_wordlist

#* Wordlist with words that must contain letters
def filtered_words_containing_letters(wordlist, included_letters):
    new_wordlist = []

    for word in wordlist:
        contain_letters = True
        for letter in included_letters:
            if letter not in word:
                contain_letters = False
                break
        if contain_letters:
            new_wordlist.append(word)

    return new_wordlist

#* Wordlist with letter(s) in specific position(s)
# This function assumes that wordlist contains the same length as your position_string
# A Positional string contains known or unknown letters of a word
# E.g. Currently known letter + positionally correct letters are P and C
# The positional_string should be 'p--c-' 
def filtered_words_positional_letters(wordlist, positional_string):
    if len(wordlist[0]) != len(positional_string):
        print("[!] Error. This function assumes that wordlist contains the same length as your position_string.")
        print("    Please pre-process your wordlist to ensure n-length.")
        return None

    new_wordlist = []
    
    #! Super un-optimized at the moment
    for word in wordlist:
        pos_matches = True
        for index, pos_letter in enumerate(positional_string):
            # Skip '-' letters or unknowns
            if pos_letter == '-':
                continue
                        
            # If at that index, the letters don't match, ignore the word
            if positional_string[index] != word[index]:
                pos_matches = False
                break
        if pos_matches:
            new_wordlist.append(word)
            
    return new_wordlist
          

#* Helper functions
# Check if there is no repeated letters within the word
def is_no_letter_repeat(word):
    counted = collections.Counter(list(word))
    
    for letter in counted:
        if counted[letter] > 1:
            return False

    return True
            

if __name__ == '__main__':
    # Test
    pass
