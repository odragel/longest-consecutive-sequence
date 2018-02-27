module.exports = function longestConsecutiveLength(array) {

    results = [];

    if ( array.length == 1 ){

        results.push(createSeq(array[0]));

    } else {
        if (array.length > 0) {

            var seq = {
                first: array[0],
                last: null,
                duplicated: 0
            };
            results.push(seq);

            var arrLength = array.length;
            for (var i = 1; i < arrLength; i++) {
                var isFound = 0;
                var value = array[i];

                //verify borders:
                //verify min borders
                var minBorder = verifyELem(value, results[0], 0);
                if (minBorder == null) {  //firstSeq is ok
                    isFound++;
                } else {
                    if (minBorder == 0) {
                        isFound++;
                        results.unshift(createSeq(value));
                    } else{
                        //it is more than minBorder

                        //verify max border
                        var maxBorder = verifyELem(value, results[results.length - 1], results.length - 1);
                        if (maxBorder == null) {  //LastSeq is ok
                            isFound++;
                        } else {
                            if (maxBorder == 1) {
                                isFound++;
                                results.push(createSeq(value));
                            } else{
                                // it is less than maxBorder
                                var verification;
                                var j = Math.floor(results.length / 2);
                                var latIndex = results.length - 1;

                                while ((latIndex - j) != 0) {
                                    verification = verifyELem(value, results[j], j);
                                    if (verification != null) {
                                        if (verification == 0) {
                                            latIndex = j;
                                            nextJ = Math.floor(j / 2);

                                        } else {
                                            nextJ = Math.floor((latIndex - j) / 2);
                                        }

                                        if(nextJ > 0){
                                            j = nextJ;
                                        } else{
                                            break;
                                        }
                                    } else {
                                        isFound++;
                                        break;
                                    }
                                }

                                if(!isFound){
                                    if(verification == 0){
                                        results.splice(j, 0, createSeq(value));
                                    }else {
                                        if(j < results.length - 1){
                                            results.splice(j + 1, 0, createSeq(value));
                                        }else{
                                            results.push(createSeq(value)) ;
                                        }

                                    }

                                }

                            }
                        }

                    }
                }

            }
      }

    }


    function createSeq(value) {

        return {first: value, last: null, duplicated: 0};
    }

    function verifyELem(value, seq, i, prevElem, nextELem) {

        var tempDif = seq.first - value;

        //check first border
        if (tempDif == 0) {
            //value is equal first border of our seq
            seq.duplicated = seq.duplicated + 1;
            return null;
        }
        else {
            //
            if(seq.last != null){
                if ((seq.first < value) && (seq.last >= value)) {
                    // our value is already in seq
                    seq.duplicated = seq.duplicated + 1;
                    return null;

                }

            }

            if (Math.abs(tempDif) == 1) {
                //we are part of this seq
                if (tempDif < 0) {
                    seq.last = value;
                    findNextSeq(value, i);
                    return null;
                } else {
                    seq.last = seq.first;
                    seq.first = value;
                    findPrevSeq(value, i);
                    return null;
                }

            } else {
                // check second border
                if (seq.last != null) {
                    var tempDif2 = seq.last - value;
                    if ((Math.abs(tempDif2) == 1)) {
                        if (tempDif2 < 0) {
                            seq.last = value;
                            findNextSeq(value, i);
                            return null;
                        } else {
                            seq.first = value;
                            findPrevSeq(value, i);
                            return null;

                        }
                    }

                    // we have second border but not suitable seq
                    //determine the directoin of next verification: 0 - left, 1 - right
                    if (tempDif2 < 0) {

                        return 1;  //we need bigger number
                    } else {
                        if(tempDif > 0)
                        {
                            return 0
                        }   //we need less number
                        else{
                            debugger;
                        }
                    }


                } else {
                    //this seq has only firstBorder
                    //determine the directoin of next verification
                    if (tempDif > 0) {
                        return 0;
                    } else {
                        return 1;
                    }


                }

            }

        }
    }


    function findNextSeq(value, i) {
        if (i < (results.length - 1)) {
            // if we could unite next seq
            var index = i + 1;
            if (results[index].first - value == 1) {
                results[i].duplicated = results[i].duplicated + results[index].duplicated;
                if (results[index].last != null) {
                    results[i].last = results[index].last;
                } else {
                    results[i].last = results[index].first;
                }
                results.splice(index, 1);
            }
        }
    }

    function findPrevSeq(value, i) {
        if (i > 0) {
            //if we could unite  previous seq
            var index = i - 1;
            if (results[index].last != null) {
                if (value - results[index].last == 1) {

                    results[i].duplicated = results[i].duplicated + results[index].duplicated;
                    results[i].first = results[index].first;
                    results.splice(index, 1);
                }

            } else {
                if (value - results[index].first == 1) {

                    results[i].duplicated = results[i].duplicated + results[index].duplicated;
                    results[i].first = results[index].first;
                    results.splice(index, 1);
                }
            }

        }
    }


    if(results.length > 0) {
     var amountOfElements = 0;
     var length;

        for (var i = 0; i < results.length; i++) {
            if(results[i].last != null){
                length = results[i].last- results[i].first+1;
            } else{
                length = 1
            }

            if (amountOfElements < length) {
                amountOfElements = length;

            }
        }


                        return amountOfElements;

                } else{

                return 0;
            }

}
