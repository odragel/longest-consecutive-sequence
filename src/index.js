module.exports = function longestConsecutiveLength(array) {
    results = [];
    if ( array.length == 1 ){
        return 1;

    } else {
        if(array.length > 0){
            results.push([array[0]]);
            for(var i = 1; i < array.length; i++){
                for(var k = 0; k < results.length; k++){
                    var isFoundSeq = 0;
                    if(results[k].length == 1){
                        //sequence has only one element
                        var tempDif =  results[k][0] - array[i];
                        //at least one sequence is suitable
                        if (Math.abs(tempDif) == 1){
                            isFoundSeq++;

                            var isFoundSecSeq = 0;
                            if (tempDif < 0){
                                results[k].push(array[i]);
                                //look for other already created seq for which cur < minBorder
                                if(lookForLessSeq(k, array[i])) {
                                    k = results.length - 1;
                                    isFoundSecSeq++;
                                    break;
                                }
                            } else{

                                results[k].unshift(array[i]);
                                // look for other already created seq for which cur > maxBorder
                                if(lookForMoreSeq(k, array[i])){
                                    k = results.length - 1;
                                    isFoundSecSeq++;
                                    break;
                                }

                            }



                        }
                        if(isFoundSeq){
                            k = results.length - 1;
                            break;
                        }

                    }


                    else{
                        // sequence already has more than 1 element
                        //verify borders of each sequence
                        var tempDif1 = results[k][0] - array[i];
                        var tempDif2 = results[k][results[k].length -1] - array[i];
                        if (Math.abs(tempDif1) == 1){
                            isFoundSeq++;
                            var isFoundSecSeq = 0;
                            if (tempDif1 < 0){
                                results[k][1] = array[i];
                                //look for other already created seq for which cur < minBorder
                                if(lookForLessSeq(k, array[i])) {
                                 //   k = results.length - 1;
                                 //   isFoundSecSeq++;
                                    break;
                                }
                            } else{
                                results[k][0] = array[i];
                                // look for other already created seq for which cur > maxBorder
                                if(lookForMoreSeq(k, array[i])) {
                                 //   k = results.length - 1;
                                 //   isFoundSecSeq++;
                                    break;
                                }

                            }

                        }else if((Math.abs(tempDif2) == 1)){
                            isFoundSeq++;

                            if (tempDif2 < 0){
                                results[k][1] = array[i];
                                //look for other already created seq for which cur < minBorder
                                if(lookForLessSeq(k, array[i]))  {
                                 //   k = results.length - 1;
                                 //   isFoundSecSeq++;
                                    break;
                                }
                            } else{
                                results[k][0] = array[i];
                                // look for other already created seq for which cur > maxBorder
                                if(lookForMoreSeq(k, array[i])) {
                                 //   k = results.length - 1;
                                //    isFoundSecSeq++;
                                    break;
                                }

                            }
                        } else{
                            //not suitable
                        }

                        if(isFoundSeq){
                          //  k = results.length - 1;
                            break;
                        }
                    }
                }

                debugger;
                if(!isFoundSeq){
                    //no suitable sequence was found
                    results.push([array[i]]);
                }
                // }

            }
        }
    }

    function lookForLessSeq(i, value){
//look for other already created seq for which cur < minBorder
        for(var m = (++i); m < results.length; m++){
            if((results[m][0] - value) == 1){
                var tempSeq=results[m].slice();
                --i;
                results[i][1] = results[m][1];
                results.splice(m, 1);
                return 1;
            }
        }
        return 0;

    }

    function lookForMoreSeq(i, value){
        //look for other already created seq for which cur > maxBorder
        for(var m = (++i); m < results.length; m++){
            if((value - results[m][results[m].length-1]) == 1){

                --i;

                results[i][0] = results[m][0];
                results.splice(m, 1);


              /*
                results[m][1] = results[i][1];
                results.splice(i, 1);
*/
                return 1;
            }
        }
        return 0;

    }


    if(results.length > 0) {
//we process the last element of array
        var amountOfElements = 0;

        var length;
        for (var i = 0; i < results.length; i++) {
            if(results[i].length > 1){
                length = results[i][1]- results[i][0]+1;
            } else{
                length = 1;
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
