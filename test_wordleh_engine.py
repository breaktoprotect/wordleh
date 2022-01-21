import unittest
import wordleh_engine

TEST_WORDS = ['hello', 'world', 'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog']
EMPTY_WORDS = []

class TestWordlehEngine(unittest.TestCase):
    def test_get_n_letter_words(self):
        # Standard
        expected_results = ['hello', 'world', 'quick', 'brown', 'jumps']
        result = wordleh_engine.get_n_letter_words(TEST_WORDS, 5)

        self.assertCountEqual(result, expected_results)
        
        # Empty wordlist
        self.assertCountEqual(wordleh_engine.get_n_letter_words(EMPTY_WORDS, 5), list())
        
    def test_get_filtered_words_no_letter_repeat(self):
        expected_results = ['world', 'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog']
        result = wordleh_engine.get_filtered_words_no_letter_repeat(TEST_WORDS)

        self.assertCountEqual(result, expected_results)

    def test_filtered_words_excluding_letters(self):
        # Exclude a single letter
        expected_results = ['the', 'quick', 'jumps', 'lazy']
        self.assertCountEqual(wordleh_engine.filtered_words_excluding_letters(TEST_WORDS, ['o']), expected_results)

        # Exclude two letters
        self.assertCountEqual(wordleh_engine.filtered_words_excluding_letters(TEST_WORDS, ['o', 'u']), ['the', 'lazy'])

    def test_filtered_words_containing_letters(self):
        # Contain a single letter
        expected_results = ['hello', 'world', 'lazy']
        self.assertCountEqual(wordleh_engine.filtered_words_containing_letters(TEST_WORDS, 'l'), expected_results)

        # Contain two letters
        expected_results = ['hello', 'world']
        self.assertCountEqual(wordleh_engine.filtered_words_containing_letters(TEST_WORDS, ['l','o']), expected_results)

    def test_filtered_words_positional_letters(self):
        # Matching last 3 letters
        test_words_alt = ['hello', 'world', 'cello', 'arrow', 'melon', 'arran']
        self.assertCountEqual(wordleh_engine.filtered_words_positional_letters(test_words_alt, '--llo'), ['hello', 'cello'])

        # Matching first 3 letters
        self.assertCountEqual(wordleh_engine.filtered_words_positional_letters(test_words_alt, 'arr--'), ['arrow', 'arran'])

        # Matching middle 2 letters
        self.assertCountEqual(wordleh_engine.filtered_words_positional_letters(test_words_alt, '-el--'), ['hello', 'cello', 'melon'])

if __name__ == "__main__":
    unittest.main()